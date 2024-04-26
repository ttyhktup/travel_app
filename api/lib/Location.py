import json
import urllib
from lib.get_cities import get_cities
import requests
from pathlib import Path
import lib.api

class Location():
  def __init__(self, country_id, country_name):
    self.country_id = country_id
    self.country_name = country_name
    self.cities = get_cities(country_id)
    self.city_weather =  {}

  def get_weather(self, maxTemp = 100,  minTemp = -50):

    for city in self.cities:
      url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&date=`2024-04-26`&units=metric&appid={lib.api.API_KEY}"
      response = requests.get(url)
      if response.status_code == 200:
        weather_data = response.json()
        temp = weather_data['main']['temp']
        if (minTemp >= temp) or (temp >= maxTemp):
          pass
        else:
          self.city_weather[city] = [self.country_name, temp]
      else:
        pass
