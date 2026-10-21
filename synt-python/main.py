from flask import Flask, request, jsonify, send_from_directory
from models.api import convert_text_to_audio
from utils import save_audio
from uuid import uuid4

app = Flask(__name__)

@app.route("/translate", methods=["POST"])
def translate():
    data = request.get_json()
    text = data.get("text")
    # Here you would call your translation function
    translated_text = text  # Replace this with actual translation logic
    return jsonify({"translated_text": translated_text})

# CURL example for text-to-audio endpoint
# curl -X POST http://localhost:3000/text-to-audio -H "Content-Type: application/json" -d '{"text": "Hello World"}'
@app.route("/text-to-audio", methods=["POST"])
def post_audio():
    print("Received request for text-to-audio")
    data = request.get_json()
    text = data.get("text")
    file_id = uuid4()

    audio_data = convert_text_to_audio(text)
    url = save_audio(audio_data, file_id)

    return jsonify({"audio_data": audio_data, "url": url})

@app.route("/audio/<path:audioFilename>", methods=["GET"])
def get_audio(audioFilename):
    return send_from_directory("audio", audioFilename)
 

if __name__ == "__main__":
    app.run(port=3000)