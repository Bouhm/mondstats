import './Abyss.css';

import _ from 'lodash';
import React, { useContext, useEffect, useRef } from 'react';

import { IAbyss } from '../data/types';
import { Store } from '../Store';
import elemColors from './builds/colors';
import CharacterTile from './CharacterTile';
import Chart, { IDataset } from './ui/Chart';
import Tooltip from './ui/Tooltip';

function Abyss({ party, floors, total }: IAbyss) {
  return (
    <div className="abyss-container">
    </div>
  )
}

export default Abyss;