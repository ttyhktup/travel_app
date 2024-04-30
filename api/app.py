from flask import Flask, request, jsonify
from flask_cors import CORS
from lib.get_countries import *
from flask import jsonify
from datetime import datetime
from dateutil.relativedelta import relativedelta

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
        continent_count= len(continents)
        min_temp = data['MinTemp'][0]
        max_temp = data['MaxTemp'][0]
        
        start_date = datetime.strptime(data['startD'][0], '%Y-%m-%d') - relativedelta(years=1)
        end_date = datetime.strptime(data['endD'][0], '%Y-%m-%d') - relativedelta(years=1)
        # ^ Creating datetime objects from dates passed in and minusing a year from them ^
        
        start_date = datetime.strftime(start_date, '%Y-%m-%d')
        end_date = datetime.strftime(end_date, '%Y-%m-%d')
        # ^ Turning processed datetime objects back into strings ^ 
        
        locations_lst = []
        
        for continent in continents:
            locations = get_countries(continent, min_temp, max_temp, continent_count, start_date, end_date)
            locations_lst = locations_lst + locations
        
        result = [location.city_weather for location in locations_lst if len(location.city_weather) != 0]
        print(result)
        return jsonify(result), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400


# Run the app
if __name__ == '__main__':
    app.run(debug=True)