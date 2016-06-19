import AppDispatcher from '../AppDispatcher.js';
import constants from '../constants.js';
import AirCheapAPI from '../api/AirCheapAPI.js';

let AirportActionCreators = {

  fetchAirports() {
    AirCheapAPI.fetchAirports();
    AppDispatcher.dispatch({
      type:constants.FETCH_AIRPORTS
    })
  },

  fetchAirportsSuccess(response) {
    AppDispatcher.dispatch({
      type: constants.FETCH_AIRPORTS_SUCCESS,
      payload: { response }
    })
  },

  fetchAirportsError(error) {
    AppDispatcher.dispatch({
      type: constants.FETCH_AIRPORTS_ERROR,
      payload: { error }
    })
  },

  chooseAirport(target, code) {
    AppDispatcher.dispatch({
      type: constants.CHOOSE_AIRPORT, 
      target: target,
      code: code
    })
  },

  fetchTickets() {
    AirCheapAPI.fetchTickets();
    AppDispatcher.dispatch({
      type: constants.FETCH_TICKETS
    })
  },

  fetchTicketsSucess(response) {
    AppDispatcher.dispatch({
      type: constants.FETCH_TICKETS_SUCCESS,
      payload: { response }
    })
  },

  fetchTicketsError(error) {
    AppDispatcher.dispatch({
      type: constants.FETCH_TICKETS_ERRROR,
      payload: { error }
    })
  }
}

export default AirportActionCreators;