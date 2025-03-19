from flask import Flask, request, jsonify
import os
from datetime import datetime

app = Flask(__name__)
UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)
    return jsonify({'filename': file.filename, 'timestamp': timestamp}), 200

@app.route('/images', methods=['GET'])
def list_images():
    images = []
    for filename in os.listdir(UPLOAD_FOLDER):
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        timestamp = datetime.fromtimestamp(os.path.getmtime(filepath)).strftime('%Y-%m-%d %H:%M:%S')
        images.append({'filename': filename, 'timestamp': timestamp})
    return jsonify(images), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)