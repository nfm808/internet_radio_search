import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { Route, Switch } from 'react-router-dom';
import StationsApiService from './services/stations-api-service';

//import SvgSpectrum from './assets/SvgSpectrum';
import SvgSpectrum from './assets/SvgSpectrumTwo';
//import SvgSpectrum from './assets/lines_burst';

// more mafia

import Nav from './Nav/nav';
import Footer from './Footer/footer';

import './App.css';
import RadioContext from './radioContext';
import Donate from './Donate/Donate';
import List from './List/List';
import Home from './Home/Home';
import Favs from './Favs/Favs';
import About from './About/About';
import PublicRouteOnly from './Utils/PublicOnlyRoute';
import PrivateRoute from './Utils/PrivateRoute';
import LoginPage from './LoginPage/LoginPage';
import RegistrationPage from './RegistrationPage/RegistrationPage';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import Dashboard from './Dashboard/Dashboard';


class App extends Component {
  static contextType = RadioContext;
  constructor(props) {
    super(props)
  
    this.state = {
      // will be populated with the list of genres available
      genres: false,
      // list of stations with their information
      radioStations: [],
      // if true shows the stripe/social share page
      showDonate: false,
      // if true show list of stations
      // set to true if working on list section
      showList: false,
      // the genre to search a list of stations
      // set to 'jazz' if working on list section
      // and follow commented instructions in
      // componentDidMount() section
      value: '',
      countryFilter: '',
      // autosuggest variable
      suggestions: [],
      // autosuggest variable
      list: [],
      // groomed list of stations for render
      filteredList: []
    }
  }



  getGenreList = () => {
    const local = localStorage.getItem('genre')
    if (!local) {
      StationsApiService.getGenres()
        .then(data => {
          localStorage.setItem("genre", JSON.stringify(data))
          this.setState({ genres: data})
        })
        .catch(err => console.log(err));
    }
    this.setState({ genres: JSON.parse(local) })
  }

  // onChange handler for input on station search
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  
  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const { genres } = this.state
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
 
    return inputLength === 0 ? [] : genres.filter(genre =>
      genre.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  }

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => suggestion.name;
  
  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => (
    <ul className="App--suggestions">
      <li>{suggestion.name + ' - stations: ' + suggestion.stationcount}</li>
    </ul>
  );

  // This filters the list of stations from the api call
  // and curates it to a presentational format
  setList = (list) => {
    const initialList = list.filter(station => station.lastcheckok === "1")
    const unique = initialList.filter((e, i) => initialList.findIndex(a => a['name'] === e['name']) === i)
    
    this.setState({
      list: unique,
      filteredList: unique,
    }) 
  }

  // api call to get the list of stations based on
  // the search inputted by the user
  handleGetList = () => {
    const { list, value } = this.state;
    if (list.length > 0) {
      this.setState({
        list: [],
        filteredList: []
      })
    }
    StationsApiService.getList(value)
      .then(list => {
        this.setList(list)
      })
      .catch(err => console.error(err))
  }

  // state handler for displaying the
  // stripe / social share section
  handleShowDonate = () => {
    this.setState({
      showDonate: true
    })
  }

  // handles the successful payment on
  // stripe / social share flow
  handlePaymentSuccess = (bool) => {
    if (bool) {
      this.handleGetList();
    } else {
      return null;
    }
  }

  handleSetFilteredByCountry = (str) => {
    const {list} = this.state;
    let value;
    if (str === 'All') {
      value = list;
    } else {
      value = list.filter(station => station.country === str);
    }
    this.setState({
      filteredList: value
    });
  }
  // test com


// '/' home component
// '/search/:genre/:country' list component
// '/station/:stationuuid'

  renderRoutes = () => {
    return (
      <Switch>
        <PrivateRoute
          exact
          path="/listen/:user"
          component={Dashboard}
        />
        <Route 
          exact
          path="/"
          component={Home}
        />
        <Route 
          path="/about"
          component={About}
        />
        <Route 
          path="/listen"
          component={List}
        />
        <Route 
          path="/contribute"
          component={Donate}
        />
        <PublicRouteOnly 
          path={'/login'}
          component={LoginPage}
        />
        <PublicRouteOnly 
          path={'/register'}
          component={RegistrationPage}
        />
        <Route 
          path='/faves'
          component={Favs}
        />
        <Route 
          component={NotFoundPage}
        />
      </Switch>
    )
  }
  renderSearch = () => {
    const { value, suggestions, genres } = this.state;
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type your music genre',
      value,
      onChange: this.onChange
    };
    const validValue = (!genres)? null: 
      genres.filter(genre => genre.name === value )[0]
    return (
      <>   
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
          /> 
          <button type="button" 
            aria-label="submit" 
            onClick={this.handleGetList} 
            disabled={!validValue}
            className="mainButton"
          >
            Get Results
          </button>
      </>
    ) 
  }

  render() {
    const { value, suggestions, list, showList, genres, filteredList } = this.state;
    const contextValue = {
      genres: genres,
      showDonate: false,
      showList: showList,
      value: value,
      suggestions: suggestions,
      list: list,
      filteredList: filteredList,
      autoSuggestOnChange: this.onChange,
      onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.onSuggestionsClearRequested,
      getSuggestions: this.getSuggestions,
      getSuggestionValue: this.getSuggestionValue,
      renderSuggestion: this.renderSuggestion,
      setList: this.setList,
      handleGetList: this.handleGetList,
      onChange: this.onChange,
      handleSetFilteredByCountry: this.handleSetFilteredByCountry,
      getGenreList: this.getGenreList
    }
    return (
        
      <RadioContext.Provider value={contextValue}>
        <Nav />
        <div className="App">
          <SvgSpectrum />
          {this.renderRoutes()}   
        </div>
        <Footer />
      </RadioContext.Provider>    
    );
  }
}

export default App
