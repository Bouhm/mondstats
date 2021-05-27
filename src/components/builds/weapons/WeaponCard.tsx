import _ from 'lodash';
import React from 'react';

import { IWeaponDb } from '../../../data/types';

function WeaponCard({ id, name, rarity, popularity }: IWeaponDb & { popularity: number }) {
  return (
    <div className={`weapon-card`}>
      <img className={`rarity-${rarity}`} src={`/assets/weapons/${id}.png`} alt={name} />
      <div className="weapon-detail">
        <div className="weapon-name">
          {name}
        </div>
        <div className="weapon-popularity">
          {popularity}%
        </div>
      </div>
    </div>
  )
}

export default WeaponCard