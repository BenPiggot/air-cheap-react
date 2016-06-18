import 'whatwg-fetch';

let AirCheapAPI = {
  fetchAirports() {
    fetch('airports.json')
    .then((response) => {
      return response.json()
    })
    .then((responseData) => {
      console.log(responseData)
      AirportActionCreators.fetchAirportsSuccess(responseData)
    })
    .catch((error) => {
      AirportActionCreators.fetchAirportsError(error);
    });
  }
};

export default AirCheapAPI;