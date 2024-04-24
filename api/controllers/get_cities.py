import json
import urllib
import requests

def get_cities(country_id):
  url = 'https://parseapi.back4app.com/classes/Continentscountriescities_City?limit=100&include=country&keys=name,country,country.name,country.continent,location'
  headers = {
      'X-Parse-Application-Id': 'uEuaHYrwga3LcPEqW3Ee1ntHSE44Vsn9NMpduv4G', # This is your app's application id
      'X-Parse-REST-API-Key': 'toQwd9fe2AmrbYC5thNQjdCVRHaJaq4DdIBXfG8r' # This is your app's REST API key
  }
  response = requests.get(url, headers=headers)
  data = response.json()['results']
  cities = [{"city": city['name'], "country_id": city['country']['objectId']} for city in data if city['country']['objectId'] == country_id]
  return cities

