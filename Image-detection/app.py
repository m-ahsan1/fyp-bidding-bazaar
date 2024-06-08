from flask import Flask, request, jsonify
import cv2
from ultralytics import YOLO
import numpy as np
import pandas as pd

app = Flask(__name__)
model = YOLO('yolov8x.pt')

# Load and clean data
def load_data():
    data = pd.read_csv('cleaned_data.csv')
    return data['Car Name'].unique().tolist()

@app.route('/unique_car_names', methods=['GET'])
def get_unique_car_names():
    return jsonify(load_data())

# ---------------------- Image detection -------------------------------------------------------------------------------------

@app.route('/detect_car', methods=['POST'])
def detect_car():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'})

    image_file = request.files['image']
    np_img = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_UNCHANGED)
    
    results = model(np_img)
    boxes = results.xyxy[0]  # Accessing the bounding boxes directly
    
    car_detected = any(class_name in ['car', 'truck'] and confidence >= 0.7
                        for _, _, _, _, confidence, class_name in boxes)

    if car_detected:
        return jsonify({'message': 'A car is detected in the image.'})
    else:
        return jsonify({'message': 'A car is not detected in the image.'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
