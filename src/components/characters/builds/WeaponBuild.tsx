import { includes, map, orderBy, take } from 'lodash';
import React, { useEffect, useState } from 'react';

import { IWeaponBuild } from '../../../data/types';
import { getPercentage } from '../../../scripts/util';
import Button from '../../controls/Button';
import useExpand from '../../hooks/useExpand';
import { FiltersType } from '../../hooks/useFilters';
import { useAppSelector } from '../../hooks/useRedux';
import HorizontalBarChart, { IBarChartData } from '../../ui/HorizontalBarChart';
import { ChevronDown, ChevronUp } from '../../ui/Icons';

type WeaponBuild = {
  weapons: IWeaponBuild[]
  total: number,
  color: string
}

const BP_WEAPONS = [11409, 12409, 14405, 15409, 13405]

function WeaponBuild({ weapons, total, filters, color }: WeaponBuild & { filters : FiltersType}) {
  const weaponDb = useAppSelector((state) => state.data.weaponDb)
  const { expanded, handleExpand } = useExpand(window.innerWidth > 1036);
  const max = 10;
  const [filteredWeapons, setFilteredWeapons] = useState<IWeaponBuild[] | []>([]) 
  
  useEffect(() => {
    let count5 = 0;
    let filteredWeapons = [];

    for (let i = 0; i < weapons.length; i++) {
      if (weaponDb[weapons[i].weaponId]) {
        if (weaponDb[weapons[i].weaponId].rarity > 4) {
          count5++;      
          
          if (count5 > filters.max5!.value) continue;
        }
  
        if (includes(BP_WEAPONS, weaponDb[weapons[i].weaponId].oid)) continue;
  
        filteredWeapons.push(weapons[i]);
        
        if (filteredWeapons.length >= max) {
          break;
        }
      }
    }

    setFilteredWeapons(weapons);

  }, [setFilteredWeapons, weapons, filters])

  return (
    <div className="weapons-list-container">
      <h1>Weapons</h1>
      <HorizontalBarChart data={take(filteredWeapons, expanded ? max : 5) as unknown as IBarChartData[]} path='weapons' db={weaponDb} total={total} color={color}/>
      <br />
      {filteredWeapons.length > 5 && (
        <Button className="weapons-show-more" onClick={handleExpand}>
          {!expanded ? <>Show more <ChevronDown size={20} /></> : <>Show less <ChevronUp size={20} /></>}
        </Button>
      )}
    </div>
  )
}

export default WeaponBuild