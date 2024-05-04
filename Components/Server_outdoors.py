from flask import Flask, request, jsonify
from flask_cors import CORS
from pp import process_audio
from tensorflow.keras.models import load_model
import numpy as np

app = Flask(__name__)
CORS(app)

class_labels = ['Car_horn', 'Dogs', 'Glass', 'Ringtone', 'Siren' ]

model_path = "MobileNetV2_outdoor.h5"
model = load_model(model_path)


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        print(request.files)
        return 'No file part'
    file = request.files['file']
    if file.filename == '':
        return 'No selected file'
    if file:
        file.save('uploads/' + file.filename)
        img = process_audio('uploads/' + file.filename)

        prediction = model.predict(img)
        prediction_class = np.argmax(prediction)
        return jsonify({'prediction': class_labels[prediction_class]})


@app.route('/')
def hello_world():
    return jsonify({'prediction': "hello world"})


if __name__ == '__main__':
    app.run(host='0.0.0.0')
