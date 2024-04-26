from flask import Flask, request, jsonify
from flask_cors import CORS
from lib.get_countries import *
from flask import jsonify
# Create the Flask app
app = Flask(__name__)
CORS(app) 


@app.route('/preferences', methods=['POST'])
def receive_preferences():
    try:
        data = request.get_json()
        # Process the received data as needed
        print("Received data:", data)
        continents = data['Continent']
        min_temp = data['MinTemp'][0]
        max_temp = data['MaxTemp'][0]
        locations_lst = []
        for continent in continents:
            locations = get_countries(continent, min_temp, max_temp)
            locations_lst = locations_lst + locations
        result = [location.city_weather for location in locations_lst if len(location.city_weather) != 0]
        return jsonify(result), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400


# Run the app
if __name__ == '__main__':
    app.run(debug=True)