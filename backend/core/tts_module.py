# core/tts_module.py

import pyttsx3

# पायथन-टू-स्पीच इंजन इनिशियलाइज़ेशन
engine = pyttsx3.init()
engine.setProperty('rate', 150)  # बोलने की गति
engine.setProperty('volume', 1.0)  # वॉल्यूम 0.0 से 1.0

def speak(text):
    """दिया गया टेक्स्ट आवाज़ में बोलें।"""
    engine.say(text)
    engine.runAndWait()
