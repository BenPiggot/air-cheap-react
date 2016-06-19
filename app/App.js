import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import { Container } from 'flux/utils';
import Autosuggest from 'react-autosuggest-legacy';
import AirportStore from './stores/AirportStore.js';
import RouteStore from './stores/RouteStore.js';
import TicketStore from './stores/TicketStore.js';
import AirportActionCreators from './actions/AirportActionCreators.js';
import TicketItem from './components/TicketItem.js';

class App extends Component {
  getSuggestions(input, callback) {
    console.log(this.state)
    const escapedInput = input.trim().toLowerCase();
    const airportMatchRegex = new RegExp('\\b' + escapedInput, 'i')
    const suggestions = this.state.airports
      .filter(airport => airportMatchRegex.test(airport.city))
      .sort((airport1, airport2) => {
        return airport1.city.toLowerCase().indexOf(escapedInput) - airport2.city.toLowerCase().indexOf(escapedInput)
      })
      .slice(0, 7)
      .map(airport => `${airport.city} - ${airport.country} (${airport.code})`);
    callback(null, suggestions)
  }

  handleSelect(target, suggestion, event) {
    const airportCodeRegex = /\(([^)]+)\)/;
    let airportCode = airportCodeRegex.exec(suggestion)[1];
    AirportActionCreators.chooseAirport(target, airportCode)
  }

  componentDidMount() {
    AirportActionCreators.fetchAirports();
  }

  componentWillUpdate(nextProps, nextState) {
    let originAndDestinationSelected = nextState.origin && nextState.destination;
    let selectionHasChangedSinceLastUpdate = nextState.origin !== this.state.origin || nextState.destination !== this.state.destination;
    if (originAndDestinationSelected && selectionHasChangedSinceLastUpdate) {
      AirportActionCreators.fetchTickets(nextState.origin, nextState.destination);
    }
  }

  render() {
    console.log(this.state.tickets)
    let ticketList = this.state.tickets.map((ticket) => {
      return <TicketItem key={ticket.id} ticket={ticket} />
    })
    console.log(ticketList)
    return <div>
      <header>
        <div className='header-brand'>
          <img src='logo.png' height='35' />
          <p>Check discount ticket prices and pay using AirCheap points</p>
        </div>
        <div className='header-route'>
          <Autosuggest id='origin' 
                       suggestions={ this.getSuggestions.bind(this) }
                       onSuggestionSelected={ this.handleSelect.bind(this, 'origin') }
                       value={this.state.origin}
                       inputAttributes={{placeholder: 'From'}}  />
          <Autosuggest id='destination' 
                       suggestions={ this.getSuggestions.bind(this) } 
                       onSuggestionSelected={ this.handleSelect.bind(this, 'destination') }
                       value={this.state.origin}
                       inputAttributes={{placeholder: 'To'}} />
        </div>
      </header>
      <div>
        {ticketList}
      </div>
    </div>
  }
}

App.getStores = () => ([AirportStore, RouteStore, TicketStore])
App.calculateState = (prevState) => ({
  airports: AirportStore.getState(),
  origin: RouteStore.get('origin'),
  destination: RouteStore.get('destination'),
  tickets: TicketStore.getState()
});

const AppContainer = Container.create(App);
render(<AppContainer />, document.getElementById('root'));

