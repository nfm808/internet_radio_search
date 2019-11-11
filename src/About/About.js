import React from 'react';
import StationApiService from '../services/stations-api-service';
import './About.css';

class About extends React.Component {
  state = {
    serverStats: {}
  }
  componentDidMount() {  
    StationApiService.getServerStatus()
      .then(data => {
        this.setState({ serverStats: data})
      }) 
      .catch(err => console.log(err))
  }

  render() {
    const {status, stations, countries, tags} = this.state.serverStats;
    return (
      <main className="About">
        <header className="About--header">
          <h1 className="green">Internet Radio Search</h1>
          <p className="white">
            Your site to discover niche radio stations
            to submit your music to. 
          </p>
        </header>
        <section className="About--server-info">
          <h2 className="green">
            Server Stats
          </h2>
          <ul className="About--server-stat-container">
            <li className='About--server-stat'>
              <h3 className='white'>Status : </h3>
              <span className={status === 'OK' ? 'green' : 'red'}>{status}</span>
            </li>
            <li className="About--server-stat">
              <h3 className='white'>Stations : </h3>
              <span className="green">{stations}</span>
            </li>
            <li className="About--server-stat">
              <h3 className='white'>Countries : </h3>
              <span className="green">{countries}</span>
            </li>
            <li className="About--server-stat">
              <h3 className='white'>Genres : </h3>
              <span className="green">{tags}</span>
            </li>
          </ul>
        </section>
      </main>
    )
  }
}
export default About;