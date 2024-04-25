import json
import urllib
import requests
from Location import Location
from get_cities import get_cities


def get_countries(continent):
    if continent == "Africa":
        continent = "X2rEcTJnsE"
    elif continent == "North America":
        continent = "vZNZcahFvu"
    elif continent == "Oceania":
        continent = "E6LHZzkHr6"
    elif continent == "Europe":
        continent = "28HX8qDZHw"
    elif continent == "Asia":
        continent = "mSxk54vkg6"
    else:
        continent = "ISPUD93Or8"

    where = urllib.parse.quote_plus(f"""
    {{
        "continent": {{
            "__type": "Pointer",
            "className": "Continentscountriescities_Continent",
            "objectId": "{continent}"
        }}
    }}
    """)
    url = 'https://parseapi.back4app.com/classes/Continentscountriescities_Country?count=1&limit=50&where=%s' % where
    headers = {
        'X-Parse-Application-Id': 'kRQSz4kyh7fXQsF2rbQ421wBKMy1Mnhk8mZW2dHw', # This is your app's application id
        'X-Parse-REST-API-Key': 'LCRd5C0UlMJ5kHMMfnzoy7e0LH4MH6BwnjMOHMQ9' # This is your app's REST API key
    }
    data = json.loads(requests.get(url, headers=headers).content.decode('utf-8')) # Here you have the data that you need
    countries = {}
    for item in data["results"]:
        countries[item["objectId"]] = item["name"]
    

    locations_lst = []

    for country in countries.items():
        new_location = Location(country[0], country[1])
        locations_lst.append(new_location)
        new_location.get_weather(50, 0)


get_countries("Asia")