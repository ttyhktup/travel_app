from amadeus import Client, ResponseError 
from api import AMADEUS_API_KEY, AMADEUS_API_SECRET
from datetime import datetime
from dateutil.relativedelta import relativedelta

def get_hotel_link(city, start_date, end_date):
    
    # adding year back on 
    start_date = datetime.strptime(start_date, '%Y-%m-%d') + relativedelta(years=1)
    end_date = datetime.strptime(end_date, '%Y-%m-%d') + relativedelta(years=1)
    
    # converting back to string
    start_date = datetime.strftime(start_date, '%Y-%m-%d')
    end_date = datetime.strftime(end_date, '%Y-%m-%d')
    
    # formatting values into booking.com url
    booking_string = f"https://www.booking.com/searchresults.en-gb.html?ss={city}&checkin={start_date}&checkout={end_date}&group_adults=2&no_rooms=1&group_children=0"
    
    return booking_string


