import _ from 'lodash';
import React, { useContext, useEffect } from 'react';

import { IWeaponBuild } from '../../../data/types';
import { useAppSelector } from '../../../hooks';
import BarChart from '../../ui/BarChart';
import Tooltip from '../../ui/Tooltip';
import WeaponCard from './WeaponCard';

type WeaponBuild = {
  weapons: IWeaponBuild[]
  total: number
} & { f2p: boolean }

const BP_WEAPONS = [11409, 12409, 14405, 15409, 13405]

function WeaponBuild({ weapons, total, f2p }: WeaponBuild) {
  const weaponDb = useAppSelector((state) => state.data.weaponDb)
  const elementColor = useAppSelector((state) => state.data.elementColor)

  const generateChartData = () => {    
    return _.map(_.take(_.orderBy(_.filter(weapons, ({_id}) => {
      if (f2p) {
        const weapon = weaponDb[_id]
        return weapon.rarity < 5 && !_.includes(BP_WEAPONS, weapon.oid)
      }

      return true
    }), 'count', 'desc'), 8), ({count, _id}, i) => {
      const popularity = Math.round((count / total) * 100)
      const weapon = weaponDb[_id];

      return { 
        label: `C${i}`, 
        value: 1 + Math.round((count / total * 1000)/10), 
        color: elementColor,
        content: <WeaponCard {...weapon} popularity={popularity} />
      }
    })
  }

  return (
    <div className="weapons-list-container">
      <h1>Weapons</h1>
      <div className="weapons-list">
        <BarChart 
          data={generateChartData()} 
          orientation="horizontal"
        ></BarChart>
      </div>
    </div>
  )
}

export default WeaponBuild