import _ from 'lodash';
import React, { useContext } from 'react';

import { IWeaponBuild } from '../../../data/types';
import { Store } from '../../../Store';
import Tooltip from '../../ui/Tooltip';
import WeaponCard from './WeaponCard';

type WeaponBuild = {
  weapons: IWeaponBuild[]
  total: number
}

function WeaponBuild({ weapons, total }: WeaponBuild) {
  const [{ weaponDb, elementColor }] = useContext(Store)

  return (
    <div className="weapons-list-container">
      <h1>Weapons</h1>
      <div className="weapons-list">
        {_.map(_.orderBy(_.take(weapons, 8), 'count', 'desc'), ({ _id, count }, i) => {
          const weapon = weaponDb[_id];
          if (!weapon) return null;

          const popularity = Math.round((count / total) * 100)

          return (
            <div key={`${_id}-${count}-${i}`} className="weapon-container withTooltip">
              <WeaponCard {...weapon} popularity={popularity} />
              <div className="bar-chart weapon-bar-chart">
                <div
                  className={`bar-chart-bar weapon-bar`} 
                  style={{ width: `${popularity}%`, backgroundColor: elementColor }} 
                />
              </div>
              <Tooltip 
                alignment="horizontal"
                content={`${weapon.name}: ${count}`}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default WeaponBuild