import React from 'react';
import loading from '../assets/loading.gif';
import './Loading.css';

const Loading = ({message, img}) => {
  return (
    <div className="Loading">
      <h2 className="Loading--message">{message}</h2>
      {img && <div className="Loading--container">
        <img className="Loading--gif" alt="loading gif" src={loading} />
      </div>}
    </div>
  )
}

export default Loading;