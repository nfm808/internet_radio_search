import React, { Component } from 'react';
import RadioContext from '../radioContext';
import Autosuggest from 'react-autosuggest';
import Loading from '../Loading/Loading';

export class Home extends Component {
  static contextType = RadioContext

  componentDidMount() {
    this.context.getGenreList()
  }

  handleSubmit = () => {
    this.props.history.push('/listen'); 
    this.context.handleGetList();
  }

  renderSearch = () => {
    const { value, suggestions, genres, onSuggestionsFetchRequested, 
      onSuggestionsClearRequested, getSuggestionValue, renderSuggestion,
      onChange } = this.context;
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type your music genre',
      value,
      onChange: onChange // from above from this.context.onChange(event) 
    };
    // the return value only serves to ensure that the genre exists
    const validValue = (!genres)? null: 
      genres.filter(genre => genre.name === value )[0];
    return (
      <>   
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          /> 
          <button type="button" 
            aria-label="submit" 
            onClick={this.handleSubmit} 
            disabled={!validValue}
            className="mainButton"
          >
            Get Results
          </button>
      </>
    ) 
  }
  render() {
    const { genres } = this.context;
    return (
      <header className="App--header">
        <h1 className="top_head">Internet Radio <br />
          <span className="bottom_head">Station Search</span>
        </h1>
        {!genres ? <Loading message="Loading..."/> : this.renderSearch()}
      </header>
    )
  }
}

export default Home
