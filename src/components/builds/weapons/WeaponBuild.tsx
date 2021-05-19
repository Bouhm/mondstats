import _ from 'lodash';
import React, { MouseEventHandler, useContext, useState } from 'react';

import { ICharWeapon } from '../../../data/types';
import { Store } from '../../../Store';
import Tooltip from '../../ui/Tooltip';
import WeaponCard from './WeaponCard';

type WeaponBuildProps = {
  weapons: ICharWeapon[],
  buildId: string,
  total: number
}

function WeaponBuild({ weapons, buildId, total }: WeaponBuildProps) {
  const [{ weaponDb, selectedCharacter, characterDb }] = useContext(Store)
  const getWeapon = (id: number) => _.find(weaponDb, { id });

  return (
    <div className="weapons-list-container">
      <h1>Weapons</h1>
      <div className="weapons-list">
        {_.map(_.orderBy(_.take(weapons, 8), 'count', 'desc'), ({ id, weaponCount }, i) => {
          const weapon = getWeapon(id);
          if (!weapon) return null;

          const popularity = Math.round((weaponCount[buildId] / total) * 100)

          return (
            <div key={`${id}-${weaponCount[buildId]}-${i}`} className="weapon-container">
              <WeaponCard {...weapon} popularity={popularity} />
              <div className="bar-chart weapon-bar-chart">
                <div
                  className={`bar-chart-bar weapon-bar ${characterDb[selectedCharacter].element.toLowerCase()}`} 
                  style={{ width: `${popularity}%` }} 
                >
                  <Tooltip 
                    alignment="horizontal"
                    content={`${weapon.name}: ${weaponCount[buildId]}`}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default WeaponBuild