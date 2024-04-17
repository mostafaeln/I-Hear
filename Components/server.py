from flask import Flask, request, jsonify
from flask_cors import CORS
from pp import process_audio
from tensorflow.keras.models import load_model
import numpy as np

app = Flask(__name__)
CORS(app)

class_labels_all = ['Car_horn', 'Doorbell', 'Cat', 'crying', 'Dogs', 'Glass', 'Water', 'Ringtone', 'Siren']
model_all = load_model("MobileNetV2.h5")

class_labels_indoor = ['Cat', 'Dogs','Doorbell','Fire_Alarm', 'Glass', 'Ringtone', 'Water','crying' ]
model_indoor = load_model("MobileNetV2_indoor.h5")

class_labels_outdoor = ['Car_horn', 'Dogs', 'Glass', 'Ringtone', 'Siren' ]
model_outdoor = load_model("MobileNetV2_outdoor.h5")


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

        mode = request.args.get('mode', default='all')

        if mode == 'All':
            prediction = model_all.predict(img)
            prediction_class = np.argmax(prediction)
            return jsonify({'prediction': class_labels_all[prediction_class]})
        
        elif mode == 'indoors':
            prediction = model_indoor.predict(img)
            prediction_class = np.argmax(prediction)
            return jsonify({'prediction': class_labels_indoor[prediction_class]})
        
        elif mode == 'outdoors':
            prediction = model_outdoor.predict(img)
            prediction_class = np.argmax(prediction)
            return jsonify({'prediction': class_labels_outdoor[prediction_class]})
        
        else:
            return jsonify({"error": "cannot find mode param"})
            


@app.route('/')
def hello_world():
    return jsonify({'prediction': "hello world"})


if __name__ == '__main__':
    app.run(host='0.0.0.0')