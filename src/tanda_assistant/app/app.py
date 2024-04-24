# chat_interface.py
import panel as pn

pn.extension()


async def callback(contents: str, user: str, instance: pn.chat.ChatInterface):
    response = f"Your message was: {contents}"
    yield response


chat_interface = pn.chat.ChatInterface(
    callback=callback, callback_user="Feynman Bot", show_clear=False
)
chat_interface.send(
    "Send a message to get a reply from the bot!",
    user="System",
    respond=False,
)
chat_interface.servable()
