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


