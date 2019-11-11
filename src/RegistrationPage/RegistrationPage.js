import React, { Component } from 'react'
import { Section } from '../Utils/Utils'
import RegistrationForm from '../RegistrationForm/RegistrationForm'
import {Link} from 'react-router-dom'
import './RegistrationPage.css'

export default class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = user => {
    const { history } = this.props
    history.push('/login')
  }

  render() {
    return (
      <Section className='RegistrationPage'>
        <h2 className="green center" >Register</h2>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
        <Link to='/login' >Login</Link>
      </Section>
    )
  }
}
