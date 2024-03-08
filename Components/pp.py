from tensorflow.keras.models import load_model
from sklearn.metrics import classification_report
import pandas as pd
import librosa
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import base64
import os

def process_audio(audio):
    clip, sample_rate = librosa.load(audio, sr=None)

    
    S = librosa.feature.melspectrogram(y=clip, sr=44000, n_fft=2048)
    
    plt.figure(figsize=(8, 6))
    plt.imshow(librosa.power_to_db(S, ref=np.max), cmap='magma')
    plt.axis('off')  
    plt.tight_layout()  
    temp_path = "temp_spectrogram.png"
    plt.savefig(temp_path, dpi=300, bbox_inches='tight', pad_inches=0)
    plt.close()
    
    pil_image = Image.open(temp_path)
    
    spectrogram_image = np.array(pil_image)
    if pil_image.mode in ('RGBA', 'LA') or (pil_image.mode == 'P' and 'transparency' in pil_image.info):
        pil_image = pil_image.convert('RGB')

    desired_size = (224, 224)
    resized_image = pil_image.resize(desired_size)
    
    plt.figure()
    plt.imshow(resized_image)
    plt.axis('off')
    
    resized_array = np.array(resized_image)
    
    img_array_normalized = resized_array / 255.0
    
    spectrogram_test = img_array_normalized.reshape(1, *img_array_normalized.shape)
    
    os.remove(temp_path)
    
    return spectrogram_test