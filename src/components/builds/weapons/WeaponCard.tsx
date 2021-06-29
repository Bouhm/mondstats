import _ from 'lodash';
import React from 'react';

import { IWeaponData, IWeaponDb } from '../../../data/types';

function WeaponCard({ oid, name, rarity, popularity }: IWeaponData & { popularity: number }) {
  return (
    <div className={`weapon-card`}>
      <img className={`rarity-${rarity}`} src={`/assets/weapons/${oid}.png`} alt={name} />
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