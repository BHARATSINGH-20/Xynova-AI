# core/wiki_module.py

import wikipedia

def search_wikipedia(query):
    """विकिपीडिया से क्वेरी का सारांश प्राप्त करें।"""
    try:
        wikipedia.set_lang("hi")  # भाषा हिंदी (अगर उपलब्ध हो)
        summary = wikipedia.summary(query, sentences=2)
        return summary
    except Exception as e:
        # अंग्रेजी में fallback
        try:
            wikipedia.set_lang("en")
            summary = wikipedia.summary(query, sentences=2)
            return summary
        except:
            return "मुझे विकिपीडिया से उत्तर नहीं मिला।"

# उदाहरण: search_wikipedia("भारत") -> भारत का सारांश
