import React, { useContext, useState } from 'react'
import { Store } from '../../Store'
import _ from 'lodash'
import { IWeapon, IWeaponBuild } from '../../data/types'

function WeaponBuild({ id, count, isExpanded }: IWeaponBuild & { isExpanded: boolean }) {
  const [{ weaponDb },] = useContext(Store);
  const weapon: IWeapon = weaponDb[id]

  if (!weapon) return null;

  return (
    <>
      <div className="weapon-build" >
        <img src={weapon.icon} alt={weapon.name} />
      </div>
      <div>
        {isExpanded &&
          <div className="weapon-details">
          </div>
        }
      </div>
    </>
  )
}
 
export default WeaponBuild