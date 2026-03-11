# core/commands.py

import os
import webbrowser
import datetime


def handle_text_command(text: str) -> bool:
    """
    Returns True if command handled.
    Returns False if normal AI query.
    """

    # Open YouTube
    if "open youtube" in text:
        webbrowser.open("https://www.youtube.com")
        print("XYNOVA: Opening YouTube...")
        return True

    # Open Google
    if "open google" in text:
        webbrowser.open("https://www.google.com")
        print("XYNOVA: Opening Google...")
        return True

    # Current time
    if "time" in text:
        now = datetime.datetime.now().strftime("%I:%M %p")
        print(f"XYNOVA: Current time is {now}")
        return True

    # Clear screen
    if text == "clear":
        os.system("cls" if os.name == "nt" else "clear")
        return True

    return False