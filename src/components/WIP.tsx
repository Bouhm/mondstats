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
    </div>
  )
}

export default UnderConstruction