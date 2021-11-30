import './Banner.scss';

import { find, isEmpty, map } from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getShortName } from '../../scripts/util';
import { useAppSelector } from '../hooks/useRedux';
import Card from '../ui/Card';

type BannerProps = {
  characters: string[]
}

function Banner({characters}: BannerProps) {
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const navigate = useNavigate();

  const handleClick = (shortname: string) => {
    navigate(`/builds/${shortname}`);
  }

  if (isEmpty(characterDb)) return null;

  return (
    <div className='banner-container'>
      <h2>Featured</h2>
      <div className='banner-cards'>
        {map(characters, name => {
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