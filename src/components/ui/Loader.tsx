import './Loader.scss';

import Logo from '/assets/logo_m.webp';
import React from 'react';
import LLImage from './LLImage'

const Loader = () => {
  return (
    <div className="loader">
      <LLImage className="logo" src={Logo} alt="logo" />
      Loading&hellip;
    </div>
  )
}

export default Loader;