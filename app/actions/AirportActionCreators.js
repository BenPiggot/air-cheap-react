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

  fetchAirportsSuccess() {
    AppDispatcher.dispatch({
      type: constants.FETCH_AIRPORTS_SUCCESS,
      payload: { response }
    })
  },

  fetchAirportsError() {
    AppDispatcher.dispatch({
      type: constants.FETCH_AIRPORTS_ERROR,
      payload: { error }
    })
  }
}

export default AirportActionCreators;