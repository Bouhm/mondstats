import './Card.scss';

import React from 'react';

import { SearchItem } from '../controls/CardSearch';
import LLImage from './LLImage';

type CardProps = { 
  onClick?: (_id: string)=>void,
  faded?: boolean,
} & SearchItem & {path: string}

function Card({ _id, rarity, name, element, path, onClick, faded=false }: CardProps) {
  let classes = "card";
  classes += ` rarity-${rarity}`;

  if (faded) {
    classes += ' faded'
  }

  const handleClick = (_id: string) => {
    onClick && onClick(_id);
  }

  return (
    <div className={`card-container`} onClick={() => handleClick(_id)}>
      <div className={classes}>
        <div className="card-image">
          {element && <LLImage className="card-element" src={`/assets/elements/${element}.webp`} />}
          <LLImage className="card-thumb" src={`/assets/${path}/${name.startsWith('Traveler ') ? 'traveler' : _id}.webp`} alt={`${name}-thumb`} />
          <div className="card-name">
            {name.length > 22 ? name.slice(0, 22) + '…' : name}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card