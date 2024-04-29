from lib.Location import * 
from lib.get_cities import get_cities
from unittest.mock import patch, Mock

def test_initiliser(mocker):
    # Mock the standalone function 'get_cities'
    mocker.patch('lib.Location.get_cities', return_value="this is mocked")
    test_location = Location("123", "fake_country")
    assert test_location.country_id == "123"
    assert test_location.country_name == "fake_country"
    assert test_location.cities == "this is mocked"
    assert test_location.city_weather == {}

def test_get_weather(mocker):
    mocker.patch('lib.Location.get_cities', return_value=[{"name": "city1", "lat": 34.05, "long": -118.25}])
    test_location = Location("123", "fake_country")
    
    with patch('requests.get') as mocked_get:
        # Create a mock response object
        mocked_response = Mock()
        
        mocked_response.status_code = 200
        
        mocked_response.json.return_value = {
            'hourly': {'temperature_2m': [20, 30]}
        }
        
        mocked_get.return_value = mocked_response

        test_location.get_weather()

        assert test_location.city_weather["city1"] == ["fake_country", 25, test_location.get_hotel_link("city1", "2023-07-13", "2023-07-15")]

        mocked_get.assert_called_once_with(
            "https://archive-api.open-meteo.com/v1/archive",
            params={
                "latitude": 34.05,
                "longitude": -118.25,
                "start_date": "2023-07-13",
                "end_date": "2023-07-15",
                "hourly": "temperature_2m",
                "timezone": "GMT"
            }
        )
def test_get_hotel_link(mocker): 
    mocker.patch('lib.Location.get_cities', return_value="this is mocked")
    test_location = Location("123", "fake_country")
    link = test_location.get_hotel_link("city1", "2023-07-13", "2023-07-15")
    assert link == "https://www.booking.com/searchresults.en-gb.html?ss=city1&checkin=2024-07-13&checkout=2024-07-15&group_adults=2&no_rooms=1&group_children=0"

