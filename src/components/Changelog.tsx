import './Changelog.css';

import _ from 'lodash';
import marked from 'marked';
import React, { useEffect, useState } from 'react';

import * as Changes from '../Changes.md';

function Changelog() { 
  return (
    <div className="changelog-container">
      <div className="markdown-body" dangerouslySetInnerHTML={{ __html: Changes.html }}/>
    </div>
  )
}

export default Changelog
