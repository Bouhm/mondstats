import React, { useState, useEffect, useContext } from 'react'
import _ from 'lodash'

function Weapon() {
  return (
    <div className={`weapon-card rarity-${weapon.rarity}`}>
      <img src={weapon.icon} alt={weapon.name} />
        <span>{count}</span>
      </div>
      <div className="weapon-detail">
      {weapon.desc}
    </div>
  )
}

export default Weapon