import './WIP.css';

import React from 'react';

function UnderConstruction() {
  return (
    <div className="construction-video">
      <h1>⚠ Under Construction</h1>
      <video autoPlay loop>
        <source src="/assets/vids/wip.webm"
              type="video/webm" />
      </video>
      <p>
        New content coming very soon. Stay tuned!
      </p>
    </div>
  )
}

export default UnderConstruction