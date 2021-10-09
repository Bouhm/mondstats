import './WeaponTable.css';

import { filter, flatten, includes, intersection, isEmpty, map, reduce, some, union, uniq } from 'lodash';
import React, { useState } from 'react';

import CardSearch, { SearchItem } from '../controls/CardSearch';
import { KEYWORDS } from '../controls/Searchbar';
import useApi from '../hooks/useApi';
import { useAppSelector } from '../hooks/useRedux';
import useWeaponSearch from '../hooks/useWeaponSearch';
import StatsTable from '../stats/StatsTable';
import Loader from '../ui/Loader';

function WeaponTable() { 
  const weaponDb = useAppSelector((state) => state.data.weaponDb)
  const weaponStats = useApi(`/weapons/top-weapons.json`)
  const [selectedWeapons, setSelectedWeapons] = useState<string[]>([])

  if (isEmpty(weaponDb) || isEmpty(weaponStats)) return <Loader />

  const { searchWeapons } = useWeaponSearch(weaponDb, weaponStats.weapons);

  const handleSelect = (selectedIds: string[]) => {
    setSelectedWeapons(selectedIds)
  }
    
  return (
    <div className="weapon-table-container">
      <CardSearch.Weapons items={filter(searchWeapons, weapon => !includes(selectedWeapons, weapon._id))} onSelect={handleSelect} />
      <StatsTable.Weapons data={isEmpty(selectedWeapons) ? weaponStats.weapons : filter(weaponStats.weapons, weapon => includes(selectedWeapons, weapon._id))} />
    </div>
  )
}

export default WeaponTable