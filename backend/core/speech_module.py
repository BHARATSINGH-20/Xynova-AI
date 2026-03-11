# core/speech_module.py

import speech_recognition as sr

def listen_command():
    """माइक्रोफोन से आवाज़ सुनें और टेक्स्ट में बदलें।"""
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        recognizer.adjust_for_ambient_noise(source)
        print("कृपया बोलें...")
        audio = recognizer.listen(source)
    try:
        # ऑफ़लाइन (pocketsphinx) से कोशिश
        text = recognizer.recognize_sphinx(audio, language='hi-IN')
        print(f"[Offline recognition] कहा गया: {text}")
        if text:
            return text
    except sr.UnknownValueError:
        # अगर ऑफलाइन पहचान नहीं हुई तो ऑनलाइन (Google) से कोशिश
        pass
    try:
        text = recognizer.recognize_google(audio, language='hi-IN')
        print(f"[Online Google recognition] कहा गया: {text}")
        return text
    except Exception as e:
        print("शब्द नहीं समझा।", e)
        return ""
