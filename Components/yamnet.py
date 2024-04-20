import os

from IPython import display
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

import tensorflow as tf
import tensorflow_hub as hub
import tensorflow_io as tfio

my_classes = ['dog', 'cat', 'door_wood_knock', 'clock_alarm', 'crying_baby', 'car_horn', 'pouring_water', 'siren', 'glass_breaking']
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
testing_wav_data = load_wav_16k_mono("carhorn1.wav")
saved_model_path = './dogs_and_cats_yamnet'
reloaded_model = tf.saved_model.load(saved_model_path)
reloaded_results = reloaded_model(testing_wav_data)
cat_or_dog = my_classes[tf.math.argmax(reloaded_results)]
print(f'The main sound is: {cat_or_dog}')


# scores, embeddings, spectrogram = yamnet_model(waveform)
# class_scores = tf.reduce_mean(scores, axis=0)
# top_class = tf.math.argmax(class_scores)
# inferred_class = class_names[top_class]
# top_score = class_scores[top_class]
# print(f'[YAMNet] The main sound is: {inferred_class} ({top_score})')

# reloaded_results = reloaded_model(waveform)
# your_top_class = tf.math.argmax(reloaded_results)
# your_inferred_class = my_classes[your_top_class]
# class_probabilities = tf.nn.softmax(reloaded_results, axis=-1)
# your_top_score = class_probabilities[your_top_class]
# print(f'[Your model] The main sound is: {your_inferred_class} ({your_top_score})')