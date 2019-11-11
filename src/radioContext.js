import React from 'react';

const RadioContext = React.createContext({
  genres: false,
  showDonate: false,
  showList: false,
  value: '',
  suggestions: [],
  list: [],
  filteredList: [],
  countryFilter: false,
  autoSuggestOnChange: () => {},
  onSuggestionsFetchRequested: () => {},
  onSuggestionsClearRequested: () => {},
  getSuggestions: () => {},
  getSuggestionValue: () => {},
  renderSuggestion: () => {},
  setList: () => {},
  handleGetList: () => {},
  onChange: () => {},
  handleSetFilteredByCountry: () => {},
  getGenreList: () => {}
})

export default RadioContext;