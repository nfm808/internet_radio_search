import React, { Component } from 'react';
import RadioContext from '../radioContext';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome} from '@fortawesome/free-solid-svg-icons';
import defaultImg from '../assets/broken_default.jpg';
import StationApiService from '../services/stations-api-service';
import Filter from '../Filter/Filter';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import './List.css';


export class List extends Component {
  static contextType = RadioContext;
  constructor(props) {
    super(props)
    this.state = {
      selectedStation: false, // should be an empty object
      savedStations: [],
      url: '',
    }
  }
  

  handleSelectStation = (station) => {
    this.setState({
      selectedStation: station,
    });
  }
  
  handleKeySelectStation = (event, station) => {
    if(event.key === 'Enter') {
      this.setState({
        selectedStation: station
      })
    };
  }

  handleSaveStation = (station) => {
    const saved = this.state.savedStations
    console.log('handleSaveStation ran');
  }
  handleCloseSelectedStation = () => {
    this.setState({
      selectedStation: false
    });
  }
  handleKeyDownCloseSelectedStation = (evt) => {
    if (evt.key === "Escape") {
      this.setState({
        selectedStation: false
      })
    }
  }
  handlePlayStation = (stationuuid) => {
    
    StationApiService.getStationPlayUrl(stationuuid)
      .then(body => {
        this.setState({
          url: body.url
        })
      })
      .catch(err => console.log(err))
  }
  
  imgErrorHandler = () => {
    this.setState({
      selectedStation: {
        ...this.state.selectedStation,
        favicon: defaultImg
      }
    })
  }

  renderList = () => {
    const { filteredList, list } = this.context
    const { selectedStation } = this.state;
    const countryList = list && [...[], ...new Set(list.map(station => station.country))]
    return (
      <section className={!selectedStation ? 'List--list' : 'hiddenList'}>
        <section className='List--filters'>
          <Filter
            label='Country' 
            all
            options={countryList}
            filterFunc={(str) => this.context.handleSetFilteredByCountry(str)}
          />
        </section>
        <ul className="List--list-container">
        {filteredList.sort((a, b) => b.clickcount - a.clickcount).map(station => 
          <li key={station.stationuuid}
              tabIndex={0}
              className={`List--li`}
              onClick={() => this.handleSelectStation(station)}
              onKeyDown={(evt) => this.handleKeySelectStation(evt, station)}
          >
            <p><span className="green">{station.name}</span></p>
          </li>)}
        </ul>
      </section>
    )
  }
   
  renderSelectedStation = () => {
    const { selectedStation } = this.state;

    return (
      <> 
        <ul className="List--list-container-e">
          <li key={selectedStation.stationuuid} 
              className={`List--li-e expanded`}
              tabIndex={0}
              onKeyDown={(evt) => this.handleKeyDownCloseSelectedStation(evt)}
          >
            <div className="List--img-container">
              <img 
                id={selectedStation.stationuuid} 
                className="List--img" 
                onError={() => this.imgErrorHandler()} 
                src={selectedStation.favicon} 
                alt="station favicon"
              />
            </div>
            <h3 className="green">{selectedStation.name}</h3>
            <a 
              href={selectedStation.homepage}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="pink">Homepage: </span>
              <FontAwesomeIcon className="List--homepage-icon" icon={faHome}></FontAwesomeIcon>
            </a>
            <p><span className='pink'>Worldwide Listeners: </span>{selectedStation.clickcount}</p>
            <p><span className='pink'>Country: </span>{selectedStation.country}</p>
            <p><span className='pink'>Language: </span>{selectedStation.language}</p>
            <div className="List--buttonContainer">
              <button 
                type="button"
                className="mainButton" 
                onClick={() => this.handleSaveStation(selectedStation)}
              >
                Save
              </button>
              <button 
                type="button"
                className="mainButton" 
                onClick={() => this.handlePlayStation(selectedStation.stationuuid)}
              >
                Play
              </button>
              <button 
                type="button"
                className="mainButton" 
                onClick={() => this.handleCloseSelectedStation()}
              >
                Close
              </button>
            </div>
          </li>
        </ul>
      </>
    )

  }
  
  render() {
    const { filteredList, value } = this.context;
    const { selectedStation } = this.state;
    const hasList = filteredList.length === 0 ? false : true;
    return (
      <main className="List">
        { value === '' && <Redirect to="/" /> }
        { !hasList && value !== '' ? <Loading message="Loading..." /> : this.renderList()}
        { selectedStation && this.renderSelectedStation()}
        { hasList && <AudioPlayer isPlaying={!this.state.url ? false : true} url={this.state.url} />}
      </main>
    )
  }
}

export default List
