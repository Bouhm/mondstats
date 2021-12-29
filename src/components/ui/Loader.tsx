import './Loader.scss';

import loaderB from '/assets/loaderBase.webp';
import loaderF from '/assets/loaderFore.webp';
import React from 'react';

const Loader = () => {
  return (
    <div className="loader">
      <div className="logo">
        <img className="logo" src={loaderB} alt="logo" />
        <img className="logo asAnimated" src={loaderF} alt="logo" />
      </div>
      Loading&hellip;
    </div>
  )
}

export default Loader;