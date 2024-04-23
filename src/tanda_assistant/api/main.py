from importlib.metadata import version

from fastapi import FastAPI
from fastapi.responses import RedirectResponse

from tanda_assistant.common.main import hello_world

app = FastAPI(
    title="tanda_assistant API",
    version=version("tanda_assistant"),
)


@app.get("/")
async def root():
    return RedirectResponse("/docs")


@app.post(
    "/hello",
)
async def hello():
    return hello_world()
