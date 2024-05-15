import asyncio
import json

import redis
from fastapi import FastAPI, Request
from fastapi.responses import (
    HTMLResponse,
    RedirectResponse,
    StreamingResponse,
)
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware
from stravalib.client import Client

from tanda_assistant.data.visualizations import get_visualizations

# TODO: Secret keys should be stored in a more secure way
# TODO: Use environment variables to store secret keys
# TODO: check if the access token is still valid
# TODO: Remove unused code

CLIENT_ID = "125463"
CLIENT_SECRET = "714fac0667a26729064973b0d01b9e317020a956"
REDIRECT_URL = "http://localhost:8000/authorized"
REDIS_URL = "redis://:INWODKrbivLwjrvWprq4ofdekb6hR0MJvy8xdLL3Fs2c4mzZxjhOMFULNbNtIjzH@136.243.151.98:5432/0"
SECRET_KEY = "secret"

app = FastAPI()
client = Client()
r = redis.Redis.from_url(REDIS_URL)
app.mount("/static", StaticFiles(directory="static", html=True), name="static")
templates = Jinja2Templates(directory="templates")
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    session = request.session
    logged_in = "access_token" in session
    visualizations = None

    user_name = session.get("user_name", "")
    access_token = session.get("access_token", "")
    visualizations = get_visualizations(access_token) if logged_in else None

    authorize_url = client.authorization_url(
        client_id=CLIENT_ID, redirect_uri=REDIRECT_URL
    )

    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "authorize_url": authorize_url,
            "logged_in": logged_in,
            "user_name": user_name,
            "visualizations": visualizations,
        },
    )


@app.get("/authorized/", response_class=HTMLResponse)
async def get_code(request: Request, state=None, code=None, scope=None):
    token_response = client.exchange_code_for_token(
        client_id=CLIENT_ID, client_secret=CLIENT_SECRET, code=code
    )
    access_token = token_response["access_token"]
    refresh_token = token_response["refresh_token"]
    expires_at = token_response["expires_at"]

    client.access_token = access_token
    client.refresh_token = refresh_token
    client.token_expires_at = expires_at

    athlete = client.get_athlete()
    name = f"{athlete.firstname} {athlete.lastname}"

    request.session["access_token"] = access_token
    request.session["refresh_token"] = refresh_token
    request.session["expires_at"] = expires_at
    request.session["user_name"] = name

    return RedirectResponse(url="/")


@app.get("/logout", response_class=HTMLResponse)
async def logout(request: Request):
    request.session.clear()
    return RedirectResponse(url="/")


@app.post("/completion")
async def completion(request: Request):
    data = await request.json()
    print(data)

    async def stream(text):
        for word in text.split():
            await asyncio.sleep(0.2)
            content = f" {word}"
            yield "data: {}\n\n".format(json.dumps({"content": content}))

    text = "This a response to your request!"

    return StreamingResponse((stream(text)), media_type="text/plain")


# def save_object(obj, filename):
#     with open(filename, "wb") as output:  # Overwrites any existing file.
#         pickle.dump(obj, output, pickle.HIGHEST_PROTOCOL)
#
#
# def load_object(filename):
#     with open(filename, "rb") as input:
#         loaded_object = pickle.load(input)
#         return loaded_object
#
#
# def check_token():
#     if time.time() > client.token_expires_at:
#         refresh_response = client.refresh_access_token(
#             client_id=CLIENT_ID,
#             client_secret=CLIENT_SECRET,
#             refresh_token=client.refresh_token,
#         )
#         access_token = refresh_response["access_token"]
#         refresh_token = refresh_response["refresh_token"]
#         expires_at = refresh_response["expires_at"]
#         client.access_token = access_token
#         client.refresh_token = refresh_token
#         client.token_expires_at = expires_at
