import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee} from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

import './footer.css';

export default function Footer(props) {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }
  return (
    <footer className='navBarFooter'>
      <section className="ft-main">
        <div className="ft-main-item">
          <h2 className="ft-title">RESOURCES</h2>
          <ul>
            <li><Link onClick={() => scrollToTop()} className='is-active' to={'/'}>
              HOME
            </Link></li>
            {' '}
            <li><Link onClick={() => scrollToTop()} className='is-active' to={'/login'}>
              LogIn
            </Link></li>
            <li><Link onClick={() => scrollToTop()} className='is-active' to={'/listen'}>
              Listen
            </Link></li>
          </ul>
        </div>
        <div className="ft-main-item">
          <h2 className="ft-title">ABOUT</h2>
          <ul>
            <li><Link onClick={() => scrollToTop()} className='is-active' to={'/about'}>
              About
            </Link></li>
            {' '}
            <li><Link onClick={() => scrollToTop()} className='is-active' to={'/favs'}>
              Our Favs
            </Link></li>
            <li><Link onClick={() => scrollToTop()} className='is-active' to={'/contribute'}>
              Support Us
            </Link></li>
          </ul>
        </div>
        <div className="ft-main-item message">
          <p className="bigmessage">Listen to 6,000 radio stations world wide.</p>
        </div>
      </section>

      <section className="ft-social">
        <ul className="ft-social-list">
          <a href='#' target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faCoffee} /></a>
          <a href='#' target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
          <a href='https://www.linkedin.com/in/nathan-fowler-luxurysandbox/' target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
          <a href='https://github.com/nfm808/online_radio_client' target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
        </ul>
      </section>

      <section className="ft-legal">
        <ul className="ft-legal-items">
          <li><Link to={'#'}>&copy; {new Date().toString().split(' ')[3]} Sandbox Creative LLC!</Link></li>
        </ul>
      </section>
    </footer>
  );
}
