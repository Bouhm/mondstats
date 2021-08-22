import _ from 'lodash';
import React from 'react';

import { IWeaponData } from '../../../data/types';
import { shortenId } from '../../../scripts/util';
import Tooltip from '../../ui/Tooltip';
import LLImage from '../../ui/LLImage'

function WeaponCard({ _id, name, rarity, count, popularity }: IWeaponData & { count: number, popularity: number }) {
  return (
    <Tooltip content={`${name}: ${count}`}>
      <div className={`weapon-card`}>
        <LLImage className={`rarity-${rarity}`} src={`/assets/weapons/${shortenId(_id)}.webp`} alt={name} />
        <div className="weapon-detail">
          <div className="weapon-name">
            {name}
          </div>
          <div className="weapon-popularity">
            <div className="weapon-popularity-pct">{popularity}%</div>
            {/* <div className="weapon-popularity-count">{count}></div> */}
          </div>
        </div>
      </div>
    </Tooltip>
  )
}

export default WeaponCard