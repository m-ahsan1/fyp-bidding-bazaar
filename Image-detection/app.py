from flask import Flask, request, jsonify
import cv2
from ultralytics import YOLO
import numpy as np
import pandas as pd
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
model = YOLO('yolov8x.pt')


# ---------------------- API for price prediction --------------------------------------------------------------------------------
@app.route('/predict', methods=['GET'])
def predict():
    try:
        # Accessing the JSON string from query parameters
        json_str = request.args.get('formData')
        if json_str:
            # Converting the JSON string to a dictionary
            form_data = json.loads(json_str)
        else:
            form_data = {}

        # Extracting individual parameters from the form_data dictionary
        rating = form_data.get('rating')
        exterior = form_data.get('exterior')
        engine = form_data.get('engine')
        suspension = form_data.get('suspension')
        interior = form_data.get('interior')
        heater = form_data.get('heater')
        mileage = form_data.get('mileage')
        company = form_data.get('company')

        # Creating a response dictionary with the extracted elements
        response = {
            'message': 'Prediction API is working',
            'params': {
                'rating': rating,
                'exterior': exterior,
                'engine': engine,
                'suspension': suspension,
                'interior': interior,
                'heater': heater,
                'mileage': mileage,
                'company': company,
            },
            'form_data': form_data
        }

        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# --------------------------------------------- API for dropdown -----------------------------------------------------------
@app.route('/dropdown')
def dropdown():
    try:
        with open('uniquecars.txt', 'r') as file:
            unique_cars_str = file.read().strip()
            unique_cars_dict = json.loads(unique_cars_str)
            return jsonify(unique_cars_dict)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ----------------------- Get Unique cars only use this api when needed ------------------------------------------------------

@app.route('/unique-cars', methods=['GET'])
def get_unique_cars():
    try:
        # Read the CSV file
        df = pd.read_csv('cleaned_data.csv')
        
        # Ensure the 'car name' column exists
        if "car name" not in df.columns:
            return jsonify({"error": "The car name column is not present in the CSV file."}), 400
        
        # Extract unique values from the 'car' column
        unique_cars = sorted(df["car name"].dropna().unique().tolist())
        
        # Return the unique values as a JSON response
        return jsonify({"unique_cars": unique_cars})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

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
    app.run(host='0.0.0.0', port=5000,debug=True)
