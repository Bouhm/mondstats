import AmberSad from '/assets/amberSad.webp';
import React from 'react';

import LLImage from './LLImage';

function Empty() {
  return <div>
    <div className="its-empty">
      <LLImage src={AmberSad} alt="empty" />
      <h3>Not enough data</h3>
    </div>
  </div>
}

export default Empty