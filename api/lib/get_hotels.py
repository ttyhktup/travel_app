from amadeus import Client, ResponseError 
from api import AMADEUS_API_KEY, AMADEUS_API_SECRET

def get_hotels():
    amadeus = Client(
        client_id = AMADEUS_API_KEY,
        client_secret = AMADEUS_API_SECRET
    )

    try: 
        response = amadeus.reference_data.locations.hotels.by_geocode.get(longitude=-0.11,latitude=51.50)
        for item in response.data:
            print(item)
    except ResponseError as error:
        print(error)

get_hotels()

# # Hotel Search v3
# # Get list of available offers by hotel ids
# amadeus.shopping.hotel_offers_search.get(hotelIds='RTPAR001', adults='2')

# # Check conditions of a specific offer
# amadeus.shopping.hotel_offer_search('XXX').get()