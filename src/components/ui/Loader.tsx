import './Loader.scss';

import Logo from '/assets/logo_m.webp';
import React from 'react';

const Loader = () => {
  return (
    <div className="loader">
      <img className="logo" src={Logo} alt="logo" />
      Loading&hellip;
    </div>
  )
}

export default Loader;