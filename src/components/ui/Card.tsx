import './Card.scss';

import React from 'react';

import { SearchItem } from './CardSearch';

type CardProps = { 
  onClick?: (_id: string)=>void,
  faded?: boolean 
} & SearchItem & {imgPath: string}

function Card({ _id, rarity, name, imgPath, onClick, faded=false }: CardProps) {
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
          <img className="card-thumb" src={`/assets/${imgPath}/${_id}.webp`} alt={`${name}-thumb`}></img>
          <div className="card-name">
            {name.length > 22 ? name.slice(0, 22) + '…' : name}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card