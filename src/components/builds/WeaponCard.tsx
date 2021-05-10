import React, { useState, useEffect, useContext } from 'react'
import _ from 'lodash'
import { IWeapon } from '../../data/types'

function WeaponCard({ rarity, icon, name, isLarge }: IWeapon & { isLarge: boolean }) {
  return (
    <div className={`weapon-card rarity-${rarity} ${isLarge && 'large'}`}>
      <img src={icon} alt={name} />
      <div className="weapon-name">
        {name}
      </div>
    </div>
  )
}

export default WeaponCard