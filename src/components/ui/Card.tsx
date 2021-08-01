import './Card.scss';

import React from 'react';

import { SearchItem } from './CardSearch';

type CardProps = { 
  onClick: (name: string)=>void,
  faded?: boolean 
} & SearchItem

function Card({ _id, rarity, name, imgUrl, onClick, faded=false }: CardProps) {
  let classes = "card";
  classes += ` rarity-${rarity}`;

  if (faded) {
    classes += ' faded'
  }

  const handleClick = (name: string) => {
    onClick && onClick(name);
  }

  return (
    <div className={`card-container`} onClick={() => handleClick(name)}>
      <div className={classes}>
        <div className="card-image">
          <img className="card-thumb" src={imgUrl} alt={`${name}-thumb`}></img>
          <div className="card-name">
            {name}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card