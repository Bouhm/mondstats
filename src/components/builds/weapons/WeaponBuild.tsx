import _ from 'lodash';
import React, { MouseEventHandler, useContext, useState } from 'react';

import { IBuild, IWeapon, IWeaponBuild } from '../../../data/types';
import { Store } from '../../../Store';
import useTooltip from '../../hooks/useTooltip';
import Tooltip from '../../ui/Tooltip';
import WeaponCard from './WeaponCard';

type WeaponBuild = {
  weapons: IWeaponBuild[]
  total: number
}

function WeaponBuild({ weapons, total }: WeaponBuild) {
  const [{ weaponDb, selectedCharacter, characterDb }] = useContext(Store)
  const getWeapon = (id: number) => _.find(weaponDb, { id });
  const { handleMouseEnter, handleMouseLeave, isHovered } = useTooltip();

  return (
    <div className="weapons-list">
      <h1>Weapons</h1>
      {_.map(_.orderBy(_.take(weapons, 8), 'count', 'desc'), ({ id, count }, i) => {
        const weapon = getWeapon(id);
        if (!weapon) return null;

        const popularity = Math.round((count / total) * 100);

        return (
          <div key={`${id}-${count}-${i}`} className="weapon-container">
            <WeaponCard {...weapon} popularity={popularity} />
            <div className="bar-chart weapon-bar-chart">
              <div
                className={`bar-chart-bar weapon-bar ${characterDb[selectedCharacter].element.toLocaleLowerCase()}`} 
                style={{ width: `${popularity}%` }} 
                onMouseEnter={(e) => handleMouseEnter(e, id)}
                onMouseLeave={handleMouseLeave}
              >
                  {isHovered(id) && <Tooltip alignment="horizontal">{`${weapon.name}: ${count}`}</Tooltip>}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default WeaponBuild