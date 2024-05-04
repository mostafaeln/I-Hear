from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow import keras
import tensorflow as tf
from tensorflow.keras.models import load_model
import tensorflow_hub as hub
import pandas as pd
import numpy as np
import os, librosa





app = Flask(__name__)
CORS(app)



class_labels = ['Doorbell', 'car_horn', 'cat', 'clock_alarm', 'crying_baby', 'dog', 'glass_breaking', 'pouring_water', 'siren']



vggish_model = hub.load('https://kaggle.com/models/google/vggish/frameworks/TensorFlow2/variations/vggish/versions/1')

def load_and_preprocess_audio(file_path, target_duration=10, target_sr=44100):
    audio, sr = librosa.load(file_path, sr=None)

    if sr != target_sr:
        audio = librosa.resample(y=audio, orig_sr=sr, target_sr=target_sr)
        sr = target_sr

    target_length = int(sr * target_duration)
    if len(audio) < target_length:
        audio = np.pad(audio, (0, target_length - len(audio)))
    elif len(audio) > target_length:
        audio = audio[:target_length]


    embeddings = vggish_model(audio)
    embeddings.shape.assert_is_compatible_with([None, 128])
    return embeddings


model_path = "model.h5"
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

        feature = load_and_preprocess_audio('uploads/' + file.filename)
        embeddings = tf.reshape(feature, shape=(-1, 28, 128, 1))
        predictions = model.predict(embeddings)

        predicted_labels = class_labels[np.argmax(predictions)]
        return jsonify({'prediction': predicted_labels})


@app.route('/')
def hello_world():
    return jsonify({'prediction': "hello world"})


if __name__ == '__main__':
    app.run(host='0.0.0.0')





