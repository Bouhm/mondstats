import './Empty.css';

import AmberSad from '/assets/amberSad.webp';
import React from 'react';

function Empty() {
  return (
    <div className="its-empty">
      <img src={AmberSad} alt="empty" />
      <h3>Not enough data</h3>
    </div>
  )
}

export default Empty