import { filter, includes, isEmpty } from 'lodash';
import React, { useState } from 'react';

import CardSearch from '../controls/CardSearch';
import { useAppSelector } from '../hooks/useRedux';
import useWeaponSearch from '../hooks/useWeaponSearch';
import Loader from '../ui/Loader';

function WeaponIndex() { 
  const weaponDb = useAppSelector((state) => state.data.weaponDb)
  const [selectedWeapons, setSelectedWeapons] = useState<string[]>([])

  if (isEmpty(weaponDb)) return <Loader />

  const { searchWeapons } = useWeaponSearch(weaponDb);

  const handleSelect = (selectedIds: string[]) => {
    setSelectedWeapons(selectedIds)
  }
    
  return (
    <div className="weapon-table-container">
      <CardSearch.Weapons items={filter(searchWeapons, weapon => !includes(selectedWeapons, weapon._id))} onSelect={handleSelect} />
    </div>
  )
}

export default WeaponIndex