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
    url = 'https://parseapi.back4app.com/classes/City?limit=3&order=-population&keys=name,country,population&where=%s' % where
    headers = {
        'X-Parse-Application-Id': 'mxsebv4KoWIGkRntXwyzg6c6DhKWQuit8Ry9sHja', # This is the fake app's application id
        'X-Parse-Master-Key': 'TpO0j3lG2PmEVMXlKYQACoOXKQrL3lwM0HwR9dbH' # This is the fake app's readonly master key
    }

    data = json.loads(requests.get(url, headers=headers).content.decode('utf-8')) # Here you have the data that you need
    cities = [city["name"] for city in data["results"]]
    return cities
