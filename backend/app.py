from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

openai.api_key = "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"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message")
    mode = data.get("mode")

    system_prompt = "তুমি নাগরিক.Ai, একজন বন্ধু ও সহায়ক এআই।"
    if mode == "study":
        system_prompt += " তুমি একজন স্টাডি পার্টনার, সহজ ভাষায় ব্যাখ্যা দাও।"
    elif mode == "routine":
        system_prompt += " তুমি একজন রুটিন কোচ, ছাত্রের জন্য সময় ভাগ করে রুটিন তৈরি করো।"
    elif mode == "fun":
        system_prompt += " তুমি মজার কৌতুক বা তথ্য দাও।"

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": message}
        ]
    )
    reply = completion.choices[0].message.content
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run()
