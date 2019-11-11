import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {STRIPE_PUBLISHABLE} from '../config';

// sets currency
const CURRENCY = 'USD';

// convert to cent for stripe api
const fromUSDToCent = amount => amount * 100;



class Checkout extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  // callback for successful token from stripe api
  successPayment = (bool) => {
    console.log('successPayment bool:', bool)
    this.props.cb(bool);
  };

  // error handler for failure from stripe api
  errorPayment = data => {
    console.log(data);
  };

  // send the token and purchase info to server
  onToken = (amount, description, cb) => token => {
    const endpoint = 'pay';
    const url = process.env.REACT_APP_API_TEST + endpoint
    const body = {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromUSDToCent(amount)
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        this.successPayment(data.success.paid)
      })
      .catch(err => this.errorPayment(err));
  }

  render() {
    const { name, description, amount } = this.props;
    return (
      <StripeCheckout
        name={name}
        description={description}
        amount={fromUSDToCent(amount)}
        token={this.onToken(amount, description)}
        currency={CURRENCY}
        stripeKey={STRIPE_PUBLISHABLE}
      />
    )
  }
} 
  
export default Checkout;