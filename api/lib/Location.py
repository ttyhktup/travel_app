import json
import urllib
from lib.get_cities import get_cities
import requests
from pathlib import Path 
import statistics 
# "2023-07-13"
class Location():
  def __init__(self, country_id, country_name):
    self.country_id = country_id
    self.country_name = country_name
    self.cities = get_cities(country_id) # This function is called when a Location is initialised, creating an API call automatically.  
    self.city_weather =  {} 

  def get_weather(self, minTemp = -50, maxTemp = 100, start_date = "2023-07-13", end_date = "2023-07-15"):
    
    for city in self.cities: 
      
      
      url = "https://archive-api.open-meteo.com/v1/archive"
      
      params = {
        "latitude": city['lat'],
        "longitude": city['long'],
        "start_date": start_date,
        "end_date": end_date,
        "hourly": "temperature_2m",
        "timezone": "GMT"
      }
      response = requests.get(url, params=params)
      if response.status_code == 200:
        weather_data = response.json()['hourly'] 
        temp = weather_data['temperature_2m'] # Getting the weather data we want from the API - this will be a list of temps for the given period
        temp = statistics.mean(temp) // 1 
        
        # This API returns a list of temperatures and we want an average, the above code uses the statistics module to calculate the mean 
        # of these temperatures and then uses floor division by 1 to round it down to whole number

        if (minTemp >= temp) or (temp >= maxTemp): # checking if temp is outside our min temp max temp range 
          pass
        else:
          self.city_weather[city['name']] = [self.country_name, temp] 
        
        # if it's fine we create a dictionary key:value pair in our city_weather param - seen in the init method of this class - that has 
        # the city name as the key then a list containing the country name and average temperature as its value. 
        # We don't need to return anything from this function. Adding items to the dictionary is all we need to do at the end.  
        
      else: 
        pass
    



