import json
import urllib
import requests

def get_cities(country_id):
    where = urllib.parse.quote_plus(f"""
    {{
        "country": {{
            "__type": "Pointer",
            "className": "Country",
            "objectId": "{country_id}"
        }},
        "population": {{
            "$gt": 2000
        }}
    }}
    """)
    url = 'https://parseapi.back4app.com/classes/City?limit=10&where=%s' % where
    headers = {
        'X-Parse-Application-Id': 'mxsebv4KoWIGkRntXwyzg6c6DhKWQuit8Ry9sHja', # This is the fake app's application id
        'X-Parse-Master-Key': 'TpO0j3lG2PmEVMXlKYQACoOXKQrL3lwM0HwR9dbH' # This is the fake app's readonly master key
    }

    data = json.loads(requests.get(url, headers=headers).content.decode('utf-8')) # Here you have the data that you need
    cities = [{'name': city["name"], 'lat': city['location']['latitude'], 'long':city['location']['longitude']} for city in data["results"]]
    
    # Here we create a list of dictionaries, each containing the name, latitude and longitude of the city we are grabbing
    # The latitude and longitude will be passed into the weather API to get an accurate weather reading
    
    return cities
