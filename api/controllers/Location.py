from get_cities import get_cities
import requests
import os
from dotenv import load_dotenv, find_dotenv
from pathlib import Path


load_dotenv(Path("../.env"))
api_key = os.getenv("API_KEY")

class Location():
  def __init__(self, country_id, country_name):
    self.country_id = country_id
    self.country_name = country_name
    self.cities = get_cities(self.country_id)

  def get_weather(self, maxTemp = None,  minTemp = None):
    city_weather = {}

    for city in self.cities:
      city_name = city["city"]
      url = f"https://api.openweathermap.org/data/2.5/weather?q={city_name}&date=`2024-04-24`&units=metric&appid={api_key}"
      response = requests.get(url)

      if response.status_code == 200:
        weather_data = response.json()
        temp = weather_data['main']['temp']

        if (minTemp > temp) or (temp > maxTemp):
          pass
        else:
          city_weather[city_name] = [self.country_name, temp]

      else:
        print(f"Failed to retrieve weather data for {city}: {response.status_code} {response.reason}")

    return city_weather

# country_id = "sv7fjDVISU"
# country_name = "Andorra"

# location = Location(country_id, country_name)
# print(location.get_weather(30, 5))