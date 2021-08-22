import './Banner.scss'

import { find, isEmpty, map } from 'lodash';
import React from 'react';
import { useAppSelector } from '../hooks/useRedux';
import Card from '../ui/Card';
import { getShortName } from '../../scripts/util';
import { useHistory } from 'react-router-dom';

function Banner() {
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const bannerCharacters = ['Yoimiya', 'Xinyan', 'Sayu', 'Diona'];
  const routerHistory = useHistory();

  const handleClick = (shortname: string) => {
    routerHistory.push(`/builds/${shortname}`)
  }

  if (isEmpty(characterDb)) return null;

  return (
    <div className='banner-container'>
      <h2>Featured</h2>
      <div className='banner-cards'>
        {map(bannerCharacters, name => {
          const character = find(characterDb, char => char.name === name);
          if (!character) return null;
          return <div key={`banner-${name}`} className="banner-card">
            <Card imgPath='characters' onClick={() => handleClick(getShortName(character))} {...character} />
          </div>
        })}
      </div>
    </div>
  )
}

export default Banner