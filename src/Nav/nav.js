import React from 'react';
import { NavLink } from 'react-router-dom';
import './nav.css';

export default function Footer(props) {
  return (
    <nav className='navBar'>
      <NavLink exact={true} activeClassName='is-active' to={'/'}>
        HOME
      </NavLink>
      {' '}
      <NavLink activeClassName='is-active' to={'/login'}>
        LogIn
      </NavLink>
      <NavLink activeClassName='is-active' to={'/listen'}>
        Listen
      </NavLink>
    </nav>
  );
}
