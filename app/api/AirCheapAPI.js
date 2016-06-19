import 'whatwg-fetch';
import AirportActionCreators from '../actions/AirportActionCreators.js';

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
  },

  fetchTickets() {
    fetch('tickets.json')
    .then((response) => response.json())
    .then((responseData) => {
      AirportActionCreators.fetchTicketsSucess(responseData)
    })
    .catch((error) => {
      AirportActionCreators.fetchTicketsError(error);
    })
  }
};

export default AirCheapAPI;