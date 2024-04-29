from lib.Location import * 
from unittest.mock import patch

def test_initiliser(mocker): 
    mocker.patch.object(lib.Location, "get_cities", return_value="this is mocked")
    test_location = Location("123", "fake_country") 
    assert test_location.country_id == "123"
    assert test_location.country_name == "fake_country"
    assert test_location.cities == "this is mocked"
    assert test_location.city_weather == {}

def test_get_weather(mocker): 
    mocker.patch.object(lib.Location, "get_cities", return_value="1")
    test_location = Location("123", "fake_country") 
    # Mocking requests.get and response.json
    with patch('requests.get') as mocked_get:
        mocked_response = mocker.Mock()
        mocked_response.status_code = 200
        mocked_response.json.return_value = {
            'main': {'temp': 25}  # Mocking temperature data
        }
        mocked_get.return_value = mocked_response
        
        # Call the method under test
        test_location.get_weather()
        
        # Assertions
        assert test_location.city_weather == {"1": ["fake_country", 25]}
