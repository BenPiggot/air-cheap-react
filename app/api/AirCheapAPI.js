import 'whatwg-fetch';
import AirportActionCreators from '../actions/AirportActionCreators.js';

let AirCheapAPI = {
  fetchAirports() {
    return fetch('airports.json')
    .then((response) => response.json())
  },

  fetchTickets() {
    return fetch('tickets.json')
    .then((response) => response.json())
  }
};

export default AirCheapAPI;