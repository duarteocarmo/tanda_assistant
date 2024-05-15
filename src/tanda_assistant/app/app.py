"""LlamaBot ChatUI that composes with Bots."""

from typing import Callable, Optional

import panel as pn


class ChatUI:
    """A mixin for a chat user interface."""

    def __init__(
        self,
        initial_message: Optional[str] = None,
        callback_function: Optional[Callable] = None,
    ):
        self.callback_function = callback_function
        if callback_function is None:
            self.callback_function = (
                lambda ai_message, user, instance: f"Echo: {ai_message}"
            )

        self.chat_interface = pn.chat.ChatInterface(
            callback=self.callback_function,
            callback_exception="verbose",
            show_rerun=False,
            show_button_name=False,
            message_params={
                "stylesheets": [],
                "show_avatar": False,
                "show_user": True,
                "show_copy_icon": False,
                "reaction_icons": {},
                "show_timestamp": False,
                "stylesheets": [
                    """
                    .message {
                        font-size: 1em;
                        margin-left: 0px; /* Adjusted for full width */
                        margin-right: 0px; /* Adjusted for full width */
                        max-width: 100%; /* Adjusted to allow full width */
                        width: 100%; /* Adjusted to extend full width */
                        justify-content: flex-start;
                    }
                    .name {
                        font-size: 0.9em;
                    }
            """
                ],
            },
        )
        if initial_message is not None:
            self.chat_interface.send(
                initial_message, user="System", respond=False
            )

    def serve(self, **kwargs):
        """Serve the chat interface.

        :returns: None
        """
        self.chat_interface.show(**kwargs)

    def view(self):
        layout1 = pn.Column(
            styles={"background": "green"}, sizing_mode="stretch_both"
        )
        layout2 = pn.Column(
            styles={"background": "red"}, sizing_mode="stretch_both"
        )
        layout3 = pn.Column(
            styles={"background": "blue"}, sizing_mode="stretch_both"
        )
        layout4 = pn.Column(
            styles={"background": "pink"}, sizing_mode="stretch_both"
        )

        template = pn.template.FastGridTemplate(
            title="Tanda Assistant",
            prevent_collision=True,
            row_height=180,
            accent="#A01346",
        )
        template.main[0:2, 0:3] = layout1
        template.main[0:2, 3:6] = layout2
        template.main[2:4, 0:3] = layout3
        template.main[2:4, 3:6] = layout4
        template.main[0:4, 6:12] = self.chat_interface

        return template

    def servable(self):
        return self.view().servable()


ChatUI().servable()
