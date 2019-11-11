import React, { Component } from 'react'
import LoginForm from '../LoginForm/LoginForm';
import { Section } from '../Utils/Utils';
import { Link } from 'react-router-dom';
import './LoginPage.css'

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <Section className='LoginPage'>
        <h2 className='green center'>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
        <Link className='white' to='/register' >Register</Link>
      </Section>
    )
  }
}
