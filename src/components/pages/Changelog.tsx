import './Changelog.css';

import _ from 'lodash';
import React, { useEffect } from 'react';

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
