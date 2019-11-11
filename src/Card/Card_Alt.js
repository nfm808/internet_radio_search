import React from 'react';
import './Card.css';
import Checkout from '../Checkout/Checkout';

const Card = ({ src, alt, text, amt, cb, heading }) => {
  // removes the dollar sign and converts to int
  const amount = parseInt(amt.slice(1, 3));
  // filter for social share card
  const isInt = amt[0] === '$' && true
  return (
    <div className="Card">
      <div tabIndex='0' className="Card--card">
        <img className="Card--img" src={src} alt={alt}/>
        <p className="subhead">{text}</p>
        {isInt && 
          <>
            <p className="message">{amt}</p>
            <Checkout 
              cb={cb}
              amount={amount}
              name={heading}
              description='You are awesome!'
            />
          </>
        }
      </div>
    </div>
  )
};



export default Card;

Card.defaultProps = {
  src: '../assets/exposure.jpg',
  alt: 'Old man playing the piano',
  text: 'No Money, just Exposure'
}