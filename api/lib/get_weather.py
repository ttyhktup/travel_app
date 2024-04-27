# import requests 
# import api
# import json

# url = "https://archive-api.open-meteo.com/v1/archive"
# params = {
# 	"latitude": 52.52,
# 	"longitude": 13.41,
# 	"start_date": "2023-07-13",
# 	"end_date": "2023-07-14",
# 	"hourly": "temperature_2m",
# 	"timezone": "GMT"
# }
# responses = requests.get(url, params=params)
# weather_data = responses.json()['hourly']

# # Process first location. Add a for-loop for multiple locations or weather models

# print(f"Coordinates {response.Latitude()}°N {response.Longitude()}°E")
# print(f"Elevation {response.Elevation()} m asl")
# print(f"Timezone {response.Timezone()} {response.TimezoneAbbreviation()}")
# print(f"Timezone difference to GMT+0 {response.UtcOffsetSeconds()} s")

"""THIS CODE AND FILE DOES NOTHING - ITS HERE AS A REFERENCE WHILST CHANGING WEATHER APIs"""