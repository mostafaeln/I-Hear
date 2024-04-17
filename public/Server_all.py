from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from tensorflow.keras.models import load_model
import numpy as np

app = Flask(__name__)
CORS(app)

class_labels = ['Car_horn', 'Doorbell', 'Cat', 'crying', 'Dogs', 'Glass', 'Water', 'Ringtone', 'Siren']

model_path = "public/MobileNetV2.h5"  # Update the model path
model = load_model(model_path)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    if file.filename == '':
        return 'No selected file'
    if file:
        file.save('public/uploads/' + file.filename)  # Save file to 'public/uploads' directory
        img = process_audio('public/uploads/' + file.filename)  # Update file path

        prediction = model.predict(img)
        prediction_class = np.argmax(prediction)
        return jsonify({'prediction': class_labels[prediction_class]})

@app.route('/')
def hello_world():
    return jsonify({'prediction': "hello world"})

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('public/static', path)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
