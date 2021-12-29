import './Changelog.css';

import React from 'react';

import * as Changes from '../../Changes.md';

function Changelog() { 
  return (
    <div className="changelog-container">
      <h1>Changes</h1>
      <div className="markdown-body" dangerouslySetInnerHTML={{ __html: Changes.html }}/>
    </div>
  )
}

export default Changelog
