from flask import Flask, request, jsonify
from flask_cors import CORS

import numpy as np
import pandas as pd

import tensorflow as tf
import tensorflow_io as tfio


app = Flask(__name__)
CORS(app)




my_classes = ['dog', 'cat', 'door_wood_knock', 'clock_alarm', 'crying_baby', 'car_horn', 'pouring_water', 'siren', 'glass_breaking']


# loading the saved YAMNet model 
saved_model_path = './yamnet'
reloaded_model = tf.saved_model.load(saved_model_path)


@tf.function
def load_wav_16k_mono(filename):
    """ Load a WAV file, convert it to a float tensor, resample to 16 kHz single-channel audio. """
    file_contents = tf.io.read_file(filename)
    wav, sample_rate = tf.audio.decode_wav(
          file_contents,
          desired_channels=1)
    wav = tf.squeeze(wav, axis=-1)
    sample_rate = tf.cast(sample_rate, dtype=tf.int64)
    wav = tfio.audio.resample(wav, rate_in=sample_rate, rate_out=16000)
    return wav




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
        testing_wav_data = load_wav_16k_mono('uploads/' + file.filename)
        
        reloaded_results = reloaded_model(testing_wav_data)
        prediction = my_classes[tf.math.argmax(reloaded_results)]

        return jsonify({'prediction': prediction})            


@app.route('/')
def hello_world():
    return jsonify({'prediction': "hello world"})


if __name__ == '__main__':
    app.run(host='0.0.0.0')
