from amadeus import Client, ResponseError 
from api import AMADEUS_API_KEY, AMADEUS_API_SECRET

def get_hotels():
    amadeus = Client(
        client_id = AMADEUS_API_KEY,
        client_secret = AMADEUS_API_SECRET
    )

    try: 
        response = amadeus.reference_data.locations.hotels.by_geocode.get(longitude=2.160873,latitude=41.397158)
        for item in response.data:
            print(item['name'])
    except ResponseError as error:
        print(error)

get_hotels()

