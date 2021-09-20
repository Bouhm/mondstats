import './WeaponPage.css';

import { isEmpty } from 'lodash';
import React, { useState } from 'react';

import useApi from '../hooks/useApi';
import { useAppSelector } from '../hooks/useRedux';
import useWeaponSearch from '../hooks/useWeaponSearch';
import Loader from '../ui/Loader';

function WeaponPage() { 
  const weaponDb = useAppSelector((state) => state.data.weaponDb)
  const weaponStats = useApi(`/weapons/top-weapons.json`)
  const [selectedWeapons, setSelectedWeapons] = useState<string[]>([])

  if (isEmpty(weaponDb) || isEmpty(weaponStats)) return <Loader />

  const { searchWeapons } = useWeaponSearch(weaponDb, weaponStats);

  const handleSelect = (selectedIds: string[]) => {
    setSelectedWeapons(selectedIds)
  }
    
  return (
    <div className="weapon-page">
      
    </div>
  )
}

export default WeaponPage