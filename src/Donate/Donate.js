import React from 'react';
import Card from '../Card/Card';
import exposure from '../assets/exposure.jpg';
import beerOrCoffee from '../assets/beer-or-coffee.jpg';
import art from '../assets/art.jpg';
import lunch from '../assets/lunch.jpg';
import './Donate.css';

class Donate extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      // controls social share component render
      renderSocial:  false,
    }
  }

  handleDonateClick = (bool) => {
    console.log('handleDonateClick ran', bool);
    this.props.cb(bool);
  }

  // set state to trigger social share component
  handleShareClick = () => {
    this.setState({
      renderSocial: true
    })
  }

  // render the social share component
  renderSocial = () => {
    console.log('renderSocial ran')
  }

  render() {
    const { renderSocial } = this.state;
    return (
      <>
      <h2 className="headline">Donate to the cause!</h2>
      <section className="Donate">
        <Card
          cb={this.handleDonateClick} 
          src={beerOrCoffee}
          heading="A tasty beverage!"
          alt='Cheers of beer and a coffee!'
          text='Send beer or coffee.'
          amt='$5'
        />
        <Card
          cb={this.handleDonateClick} 
          src={lunch}
          heading="Lunch!"
          alt='Lunch'
          text='Perhaps a nice lunch.'
          amt='$15'
        />
        <Card
          cb={this.handleDonateClick} 
          src={art}
          heading='Daddy daughter activies!'
          alt='Art supplies'
          text='Daughter Activity Fund!'
          amt='$25'
        />
        <Card
          cb={this.handleShareClick} 
          src={exposure}
          alt='Old man playing piano with a cigarette hanging from his lips'
          text='No Money, Just Exposure'
          amt='Tell Your Friends!'
        />
        {renderSocial && this.renderSocial()}
      </section>
      </>
    )
  }
  
}

export default Donate;