import asyncio
import io
import json

import redis
from fastapi import FastAPI, Request
from fastapi.responses import (
    HTMLResponse,
    JSONResponse,
    RedirectResponse,
    StreamingResponse,
)
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse
from stravalib.client import Client

CLIENT_ID = "125463"
CLIENT_SECRET = "714fac0667a26729064973b0d01b9e317020a956"
REDIRECT_URL = "http://localhost:8000/authorized"
REDIS_URL = "redis://:INWODKrbivLwjrvWprq4ofdekb6hR0MJvy8xdLL3Fs2c4mzZxjhOMFULNbNtIjzH@136.243.151.98:5432/0"

app = FastAPI()
client = Client()
r = redis.Redis.from_url(REDIS_URL)
app.mount("/static", StaticFiles(directory="static", html=True), name="static")


@app.get("/", response_class=HTMLResponse)
async def home():
    return FileResponse("static/index.html")


@app.get("/login", response_class=HTMLResponse)
async def login():
    authorize_url = client.authorization_url(
        client_id=CLIENT_ID, redirect_uri=REDIRECT_URL
    )
    return f"""
    <html>
        <head>
            <title>Login with Strava</title>
        </head>
        <body>
            <a href="{authorize_url}"><button>Login with Strava</button></a>
        </body>
    </html>
    """


@app.get("/authorized/", response_class=HTMLResponse)
async def get_code(state=None, code=None, scope=None):
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

    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Athlete Page</title>
    </head>
    <body>
        <h1>Hello, {name}</h1>
        <form action="/logout/" method="get">
            <button type="submit">Logout</button>
        </form>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content, status_code=200)


@app.get("/logout/")
async def logout():
    client.deauthorize()
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
#
#
# try:
#     client = load_object("client.pkl")
#     check_token()
#     athlete = client.get_athlete()
#     print(
#         "For {id}, I now have an access token {token}".format(
#             id=athlete.id, token=client.access_token
#         )
#     )
#
#     # To upload an activity
#     # client.upload_activity(activity_file, data_type, name=None, description=None, activity_type=None, private=None, external_id=None)
# except FileNotFoundError:
#     print("No access token stored yet, visit http://localhost:8000/ to get it")
#     print(
#         "After visiting that url, a pickle file is stored, run this file again to upload your activity"
#     )
