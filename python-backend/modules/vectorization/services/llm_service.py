import requests
import json
from typing import List, Dict
from shared.config import settings

class LLMService:
    def __init__(self):
        self.settings = settings.get_settings()
        self.groq_key = self.settings.get("groq_api_key")
        self.gemini_key = self.settings.get("gemini_api_key")
        self.openrouter_key = self.settings.get("openrouter_api_key")
        self.model = self.settings.get("llm_model", "google/gemma-4-26b-a4b-it:free")
        self.groq_url = "https://api.groq.com/openai/v1/chat/completions"
        self.openrouter_url = "https://openrouter.ai/api/v1/chat/completions"

    def generate_answer(self, query: str, context_chunks: List[Dict]) -> str:
        # 1. Prepare context
        context_text = "\n\n".join([c['text'] for c in context_chunks])
        
        prompt = f"""You are an AI Book Assistant. Use the following context from a book to answer the user's question accurately.
If the answer is not in the context, say "I don't know based on this book."

CONTEXT:
{context_text}

QUESTION: {query}
ANSWER:"""

        # 2. Try Groq (Primary)
        if self.groq_key:
            print(f"DEBUG: Using Groq for query: {query[:20]}...")
            try:
                headers = {
                    "Authorization": f"Bearer {self.groq_key}",
                    "Content-Type": "application/json"
                }
                payload = {
                    "model": "llama-3.3-70b-versatile",
                    "messages": [{"role": "user", "content": prompt}]
                }
                resp = requests.post(self.groq_url, headers=headers, json=payload, timeout=20)
                if resp.status_code == 200:
                    data = resp.json()
                    answer = data['choices'][0]['message']['content']
                    print("DEBUG: Groq success")
                    return answer.strip()
                elif resp.status_code == 400 and "model_decommissioned" in resp.text:
                    # Try Llama 3.1 or 3.2 if 3.3 fails
                    print("DEBUG: Llama 3.3 failed, trying Llama 3.1...")
                    payload["model"] = "llama-3.1-70b-versatile"
                    resp = requests.post(self.groq_url, headers=headers, json=payload, timeout=20)
                    if resp.status_code == 200:
                        data = resp.json()
                        return data['choices'][0]['message']['content'].strip()
                else:
                    print(f"DEBUG: Groq failed (Status {resp.status_code}): {resp.text}")
            except Exception as e:
                print(f"DEBUG: Groq Error: {str(e)}")

        # 3. Try Gemini Direct (Secondary Fallback)
        if self.gemini_key:
            models_to_try = ["gemini-1.5-flash", "gemini-pro"]
            for model in models_to_try:
                print(f"DEBUG: Trying Gemini model: {model}...")
                try:
                    gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={self.gemini_key}"
                    payload = {"contents": [{"parts": [{"text": prompt}]}]}
                    resp = requests.post(gemini_url, json=payload, timeout=20)
                    if resp.status_code == 200:
                        data = resp.json()
                        answer = data['candidates'][0]['content']['parts'][0]['text']
                        print(f"DEBUG: Gemini success with {model}")
                        return answer.strip()
                except Exception as e:
                    print(f"DEBUG: Gemini Error: {str(e)}")

        # 4. Fallback to OpenRouter
        print(f"DEBUG: Falling back to OpenRouter with model={self.model}")
        if not self.openrouter_key or self.openrouter_key == "your_open_router_apiKey_here":
            return "Error: No API key configured. Please provide a Gemini or OpenRouter key."
            
        headers = {
            "Authorization": f"Bearer {self.openrouter_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://github.com/AI-Book-Reader",
            "X-Title": "AI Book Reader"
        }
        
        payload = {
            "model": self.model,
            "messages": [{"role": "user", "content": prompt }]
        }
        
        try:
            resp = requests.post(self.openrouter_url, headers=headers, json=payload, timeout=60)
            if resp.status_code == 200:
                data = resp.json()
                return data['choices'][0]['message']['content'].strip()
            else:
                print(f"DEBUG: OpenRouter status={resp.status_code}")
                print(f"DEBUG: OpenRouter error={resp.text}")
                return "I apologize, but the AI engine is currently overloaded (429). Please try again in a minute."
        except Exception as e:
            print(f"DEBUG: Fallback error: {str(e)}")
            return "Connection error. Please try again."

llm_service = LLMService()
