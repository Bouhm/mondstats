import './Loader.scss';

import loader from '/assets/loader.webp';
import React from 'react';

import LLImage from './LLImage';

const Loader = () => {
  return (
    <div className="loader">
      <LLImage className="logo" src={loader} alt="logo" />
      Loading&hellip;
    </div>
  )
}

export default Loader;