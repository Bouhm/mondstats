import './Card.scss';

import React from 'react';

import { SearchItem } from './CardSearch';

type CardProps = { 
  onClick?: (name: string)=>void,
  faded?: boolean 
} & SearchItem & {imgPath: string}

function Card({ _id, oid, rarity, name, imgPath, onClick, faded=false }: CardProps) {
  let classes = "card";
  classes += ` rarity-${rarity}`;

  if (faded) {
    classes += ' faded'
  }

  const handleClick = (oid: number) => {
    onClick && onClick(oid);
  }

  return (
    <div className={`card-container`} onClick={() => handleClick(oid)}>
      <div className={classes}>
        <div className="card-image">
          <img className="card-thumb" src={`/assets/${imgPath}/${oid}.webp`} alt={`${name}-thumb`}></img>
          <div className="card-name">
            {name}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card