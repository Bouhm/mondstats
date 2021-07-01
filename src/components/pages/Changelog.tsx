import './Changelog.css';

import _ from 'lodash';
import React, { useEffect } from 'react';

import * as Changes from '../../Changes.md';

function Changelog() { 
  useEffect(() => {
    window.scrollTo(0,0);
  },[])

  return (
    <div className="changelog-container">
      <h1>Changelog</h1>
      <div className="markdown-body" dangerouslySetInnerHTML={{ __html: Changes.html }}/>
    </div>
  )
}

export default Changelog
