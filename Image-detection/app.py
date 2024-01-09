from flask import Flask, request, jsonify
import cv2
from ultralytics import YOLO

app = Flask(__name__)
model = YOLO('yolov8x.pt')

@app.route('/detect_car', methods=['POST'])
def detect_car():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'})

    image_file = request.files['image']
    np_img = cv2.imdecode(np.fromstring(image_file.read(), np.uint8), cv2.IMREAD_UNCHANGED)
    
    results = model(np_img)
    result = results.xyxy[0]
    
    car_detected = False
    boxes = result.xyxy

    for box in boxes:
        class_index = int(box[-1])
        confidence = box[4]

        class_name = result.names[class_index]
        if (class_name == 'car' or class_name == 'truck') and confidence >= 0.7:
            car_detected = True
            break

    if car_detected:
        return jsonify({'message': 'A car is detected in the image.'})
    else:
        return jsonify({'message': 'A car is not detected in the image.'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
