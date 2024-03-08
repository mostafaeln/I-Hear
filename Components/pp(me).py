from tensorflow.keras.models import load_model
from sklearn.metrics import classification_report
import pandas as pd
import librosa
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import base64
import os
def process_audio(audio):
    clip, sample_rate = librosa.load(audio, sr=None)
    
    # Calculate the mel spectrogram
    S = librosa.feature.melspectrogram(y=clip, sr=44000, n_fft=2048)
    
    # Display the spectrogram as an image
    plt.figure(figsize=(8, 6))
    plt.imshow(librosa.power_to_db(S, ref=np.max), cmap='magma')
    plt.axis('off')  # Turn off axis
    plt.tight_layout()  # Ensure tight layout
    temp_path = "temp_spectrogram.png"
    plt.savefig(temp_path, dpi=300, bbox_inches='tight', pad_inches=0)
    plt.close()  # Close the plot
    
    # Read the saved image using PIL
    pil_image = Image.open(temp_path)
    
    # Convert the image to numpy array
    spectrogram_image = np.array(pil_image)
    if pil_image.mode in ('RGBA', 'LA') or (pil_image.mode == 'P' and 'transparency' in pil_image.info):
        pil_image = pil_image.convert('RGB')
    # Resize the image to the desired dimensions (224x224)
    desired_size = (224, 224)
    resized_image = pil_image.resize(desired_size)
    
    # Plot the resized image
    plt.figure()
    plt.imshow(resized_image)
    plt.axis('off')
    plt.show()
    
    # Convert the resized image back to numpy array
    resized_array = np.array(resized_image)
    
    # Normalize the array
    img_array_normalized = resized_array / 255.0
    
    # Reshape the array
    spectrogram_test = img_array_normalized.reshape(1, *img_array_normalized.shape)
    
    # Clean up temporary file
    os.remove(temp_path)
    
    return spectrogram_test
def predict_single_spectrogram(spectrogram_path, model, class_labels, target_size=(224, 224,3)):
    img = load_img(spectrogram_path, target_size=target_size)
    img_array = img_to_array(img)
    img_array_normalized = img_array / 255.0
    spectrogram_test = img_array_normalized.reshape(1, *img_array_normalized.shape)
    # prediction = model.predict(spectrogram_test)
    # prediction_class = np.argmax(prediction)
    # predicted_label = class_labels[prediction_class]
    return spectrogram_test

folder="/content/11.wav"
img = process_audio(folder);
print(img)
model_path = "MobileNetV2.h5"
model = load_model(model_path)    
class_labels =[ 'Car_horn' ,'Doorbell' ,'Cat' ,'crying','Dogs' ,'Glass', 'Water'  ,'Ringtone' , 'Siren' ]
#predictions = predict_single_spectrogram("/content/Nokia 2650 original ringtones7_spectrogram_freq.png" , model , class_labels)
prediction = model.predict(img);
prediction_class=np.argmax(prediction)
print(prediction) 
print(prediction_class)
print(class_labels[prediction_class])