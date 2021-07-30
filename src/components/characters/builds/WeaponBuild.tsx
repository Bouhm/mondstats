import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';

import { IWeaponBuild } from '../../../data/types';
import { Filters } from '../../filters/useFilters';
import { useAppSelector } from '../../hooks/useRedux';
import WeaponCard from './WeaponCard';

type WeaponBuild = {
  weaponBuilds: IWeaponBuild[]
  total: number,
  color: string
}

const BP_WEAPONS = [11409, 12409, 14405, 15409, 13405]

function WeaponBuild({ weaponBuilds, total, filters, color }: WeaponBuild & { filters : Filters}) {
  const weaponDb = useAppSelector((state) => state.data.weaponDb)
  const max = 8;
  const [filteredWeapons, setFilteredWeapons] = useState<IWeaponBuild[] | []>([])

  useEffect(() => {
    let orderedWeapons = _.orderBy(weaponBuilds, 'count', 'desc');

    if (filters.f2p) {
      let weapons: IWeaponBuild[] = []
      let count5 = 0;

      for (let i = 0; i < orderedWeapons.length; i++) {
        if (weaponDb[orderedWeapons[i]._id].rarity > 4) {
          count5++;      
          
          if (count5 > filters.max5) continue;
        }

        if (_.includes(BP_WEAPONS, weaponDb[orderedWeapons[i]._id].oid)) continue;
  
        weapons.push(orderedWeapons[i]);
        
        if (weapons.length >= max) {
          break;
        }
      }

      setFilteredWeapons(weapons);
    } else {
      setFilteredWeapons(_.take(orderedWeapons, max));
    }

  }, [setFilteredWeapons, weaponBuilds, filters])

  return (
    <div className="weapons-list-container">
      <h1>Weapons</h1>
      <div className="weapons-list">
        {_.map(filteredWeapons, ({ _id, count }, i) => {
          const weapon = weaponDb[_id];
          if (!weapon) return null;

          const popularity = Math.round((count / total * 1000) / 10)

          return (
            <div key={`${_id}-${count}-${i}`} className="weapon-container">
              <WeaponCard {...weapon} count={count} popularity={popularity} />
              <div className="barchart weapon-bar-chart">
                <div
                  className={`barchart-bar weapon-bar`} 
                  style={{ width: `${popularity}%`, backgroundColor: color }} 
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default WeaponBuild