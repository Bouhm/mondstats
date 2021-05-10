import React, { useState, useEffect, useContext } from 'react'
import _ from 'lodash'
import { IWeapon } from '../../data/types'

function WeaponCard({ icon, name, rarity, popularity }: IWeapon & { popularity: number }) {
  return (
    <div className={`weapon-card`}>
      <img className={`rarity-${rarity}`} src={icon} alt={name} />
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