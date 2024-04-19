from flask import Flask, request, jsonify
from flask_cors import CORS

import numpy as np
import pandas as pd

import tensorflow as tf
import tensorflow_io as tfio

import wave


app = Flask(__name__)
CORS(app)






def convert_to_16bit_pcm(input_file, output_file):
    with wave.open(input_file, 'rb') as in_wave:
        # Read WAV file properties
        params = in_wave.getparams()
        num_channels, samp_width, frame_rate, num_frames, _, _ = params

        # Read audio data
        audio_data = in_wave.readframes(num_frames)
    
    # Convert audio data to numpy array
    samples = np.frombuffer(audio_data, dtype=np.int16)

    # If already 16-bit PCM, no need to convert
    if samp_width == 2:
        with wave.open(output_file, 'wb') as out_wave:
            out_wave.setparams(params)
            out_wave.writeframes(audio_data)
    else:
        # Rescale to 16-bit PCM
        scaled_data = (samples / (2 ** (samp_width * 8 - 1))).astype(np.int16)
        
        # Write to a new WAV file
        with wave.open(output_file, 'wb') as out_wave:
            out_wave.setparams((num_channels, 2, frame_rate, num_frames, 'NONE', 'not compressed'))
            out_wave.writeframes(scaled_data.tobytes())




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
        convert_to_16bit_pcm('uploads/' + file.filename, 'uploads/' +"16"+ file.filename)
        testing_wav_data = load_wav_16k_mono('uploads/' +"16"+ file.filename)
        
        reloaded_results = reloaded_model(testing_wav_data)
        prediction = my_classes[tf.math.argmax(reloaded_results)]

        return jsonify({'prediction': prediction})            


@app.route('/')
def hello_world():
    return jsonify({'prediction': "hello world"})


if __name__ == '__main__':
    app.run(host='0.0.0.0')
