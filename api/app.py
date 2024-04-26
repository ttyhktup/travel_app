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
        continent = data['Continent'][0]
        min_temp = data['MinTemp'][0]
        max_temp = data['MaxTemp'][0]
        print(continent)
        print(min_temp)
        locations_lst = get_countries(continent, min_temp, max_temp)
        print(locations_lst)
        result = [location.city_weather for location in locations_lst if len(location.city_weather) != 0]
        print(result)
        return jsonify(result), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400


# Run the app
if __name__ == '__main__':
    app.run(debug=True)