import './WeaponStatistics.css';

import { filter, flatten, includes, intersection, isEmpty, map, reduce, some, union, uniq } from 'lodash';
import React, { useState } from 'react';

import useApi from '../hooks/useApi';
import { useAppSelector } from '../hooks/useRedux';
import StatsTable from '../stats/StatsTable';
import CardSearch, { SearchItem } from '../ui/CardSearch';
import Loader from '../ui/Loader';
import { KEYWORDS } from '../ui/Searchbar';

function WeaponStatistics() { 
  const weaponDb = useAppSelector((state) => state.data.weaponDb)
  const weaponStats = useApi(`/weapons/top-weapons.json`)
  const [selectedWeapons, setSelectedWeapons] = useState<string[]>([])

  if (isEmpty(weaponDb) || isEmpty(weaponStats)) return <Loader />

  const weaponItems = map(weaponStats, ({_id}) => {
    const weapon = weaponDb[_id]

    return ({
      _id,
      name: weapon.name,
      rarity: weapon.rarity,
      keys: uniq(
        filter(KEYWORDS, key => includes(weapon.effect, key))
      ).join(" ")
    })
  });

  const handleSelect = (selectedIds: string[]) => {
    setSelectedWeapons(selectedIds)
  }
    
  return (
    <div className="weapon-stats-container">
      <CardSearch.Weapons items={filter(weaponItems, weapon => !includes(selectedWeapons, weapon._id))} onSelect={handleSelect} />
      <StatsTable.WeaponStatistics data={isEmpty(selectedWeapons) ? weaponStats : filter(weaponStats, weapon => includes(selectedWeapons, weapon._id))} />
    </div>
  )
}

export default WeaponStatistics