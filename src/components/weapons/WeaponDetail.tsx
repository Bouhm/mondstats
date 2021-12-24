import './WeaponDetail.scss';

import React from 'react';

import { IWeaponData } from '../../data/types';

type WeaponDetailProps = {
  weapon: IWeaponData;
}

function WeaponDetail({ weapon }: WeaponDetailProps) {
  return (
    <div className="weapon-detail-container">
      <div className="weapon-detail">
        <img className={`rarity-${weapon.rarity}`} src={`/assets/weapons/${weapon._id}.webp`} />
        <div className="weapon-detail-stats">
          <div className="weapon-detail-name">{weapon.name}</div>
          <div className="weapon-detail-stat-title">Base Atk:</div>
          <div className="weapon-detail-stat-value">{weapon.baseAtk}</div>
          <div className="weapon-detail-stat-title">{weapon.subStat}:</div>
          <div className="weapon-detail-stat-value">{weapon.subValue}</div>
        </div>
      </div>
      <div className="weapon-detail-effect">{weapon.effect}</div>
    </div>
  )
}

export default WeaponDetail;