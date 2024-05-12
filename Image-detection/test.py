import requests

url = 'http://localhost:5000/predict'
data = {
    'rating': 97,
    'exterior & body': 89,
    'engine/transmission/clutch': 100,
    'suspension/steering': 100,
    'interior': 99,
    'ac/heater': 100,
    'model date': 15,
    'mileage': 16603,
    'fuel type': 2,
    'transmission': 1,
    'company': 11,
    'variant': 83
}

response = requests.post(url, json=data)
print(response.json())  # Print the predicted price
