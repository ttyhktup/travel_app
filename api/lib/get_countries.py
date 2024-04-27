import json
import urllib
import requests
from Location import Location
from get_cities import get_cities

def get_countries(continent, min_temp, max_temp, continent_count, start_date, end_date):
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
    
    # In the code above we convert the continent being passed in, into it's ID representation 
    # that is recognised by the API we are using.  
    
    where = urllib.parse.quote_plus(f"""
    {{
        "continent": {{
            "__type": "Pointer",
            "className": "Continentscountriescities_Continent",
            "objectId": "{continent}"
        }}
    }}
    """)
    if continent_count == 1:
        url = 'https://parseapi.back4app.com/classes/Continentscountriescities_Country?count=1&limit=40&where=%s' % where
        headers = {
        'X-Parse-Application-Id': 'kRQSz4kyh7fXQsF2rbQ421wBKMy1Mnhk8mZW2dHw', 
        'X-Parse-REST-API-Key': 'LCRd5C0UlMJ5kHMMfnzoy7e0LH4MH6BwnjMOHMQ9' 
    }
    elif continent_count == 2 or continent_count == 3:
        url = 'https://parseapi.back4app.com/classes/Continentscountriescities_Country?count=1&limit=25&where=%s' % where
        headers = {
        'X-Parse-Application-Id': 'kRQSz4kyh7fXQsF2rbQ421wBKMy1Mnhk8mZW2dHw', 
        'X-Parse-REST-API-Key': 'LCRd5C0UlMJ5kHMMfnzoy7e0LH4MH6BwnjMOHMQ9' 
    }
    elif continent_count == 4 or continent_count == 5:
        url = 'https://parseapi.back4app.com/classes/Continentscountriescities_Country?count=1&limit=15&where=%s' % where
        headers = {
        'X-Parse-Application-Id': 'kRQSz4kyh7fXQsF2rbQ421wBKMy1Mnhk8mZW2dHw',
        'X-Parse-REST-API-Key': 'LCRd5C0UlMJ5kHMMfnzoy7e0LH4MH6BwnjMOHMQ9' 
        }
    elif continent_count == 6 or continent_count == 0:
        url = 'https://parseapi.back4app.com/classes/Continentscountriescities_Country?count=1&limit=10&where=%s' % where
        headers = {
        'X-Parse-Application-Id': 'kRQSz4kyh7fXQsF2rbQ421wBKMy1Mnhk8mZW2dHw', 
        'X-Parse-REST-API-Key': 'LCRd5C0UlMJ5kHMMfnzoy7e0LH4MH6BwnjMOHMQ9'
        }
    # In the above code we are limiting the number of countries we get back if the number of continents chosen is greater.
    # This lessens the time taken to make the calls and the demand we are placing on the API

    data = json.loads(requests.get(url, headers=headers).content.decode('utf-8')) # Here you have the data that you need
    countries = {}
    for item in data["results"]:
        countries[item["objectId"]] = item["name"]
    
    # Above, we initialise a 'countries' dictionary and assign ID:country_name key, value pairs

    locations_lst = [] # This is the list that is returned from this function and passed to the API file. 
    
    for country in countries.items():
        new_location = Location(country[0], country[1])
        locations_lst.append(new_location)
        new_location.get_weather(min_temp, max_temp, start_date, end_date)
    
    return locations_lst 
    
    # In the above code we iterate through the countries dictionary using .items(). This turns each key:value
    # pair into a tuple that looks like this (key, value). this means we have easy access to both the object ID 
    # and the name of the country and we can pass it into the Location Class, using the indexes [0] and [1], when it is initialised. 
    
    # The Location class has the logic for retrieving cities built into its __init__() method, here we just need to call 
    # its get_weather method, passing in the min_temp, max_temp and dates of the holiday. Now locations_lst is filled 
    # with Location class objects that each represent a country and contain its cities and temps. This is what we 
    # return at the end. 
