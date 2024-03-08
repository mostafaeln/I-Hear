# from flask import Flask, request

# app = Flask(__name__)

# @app.route('/upload', methods=['POST'])
# def uploadfile():
#     if 'file' not in request.files:
#         return 'No file part'
#     file = request.files['file']
#     if file.filename == '':
#         return 'No selected file'
#     if file:
#         file.save('uploads/' + file.filename)
#         return 'File uploaded successfully'

# if __name__ == '__main__':
#     app.run(host='0.0.0.0')
#'/home/haidyelnahass/flask-upload/uploads/'


from flask import Flask, request, jsonify
from flask_cors import CORS
from pp import process_audio

import numpy as np

app = Flask(__name__)
CORS(app)



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


        return img





if __name__ == '__main__':
    app.run(host='0.0.0.0')
