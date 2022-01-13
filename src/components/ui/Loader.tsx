import './Loader.scss';

import loaderB from '/assets/loaderBase.webp';
import loaderF from '/assets/loaderFore.webp';
import React from 'react';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <img className="loader" src={loaderB} alt="loader" />
        <img className="loader asAnimated" src={loaderF} alt="logo" />
      </div>
      Loading&hellip;
    </div>
  )
}

export default Loader;