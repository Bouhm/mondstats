import './Card.scss';

import React from 'react';

import { shortenId } from '../../scripts/util';
import { SearchItem } from './CardSearch';
import LLImage from './LLImage'

type CardProps = { 
  onClick?: (_id: string)=>void,
  faded?: boolean 
} & SearchItem & {imgPath: string}

function Card({ _id, rarity, name, element, imgPath, onClick, faded=false }: CardProps) {
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
          <LLImage className="card-thumb" src={`/assets/${imgPath}/${name.startsWith('Traveler ') ? 'traveler' : shortenId(_id)}.webp`} alt={`${name}-thumb`} />
          <div className="card-name">
            {name.length > 22 ? name.slice(0, 22) + '…' : name}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card