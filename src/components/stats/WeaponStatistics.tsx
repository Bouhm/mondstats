import './WeaponStatistics.css';

import React, { useEffect, useState } from 'react';
import WeaponStats from '../../data/weaponStats.json';
import { IWeaponStats } from '../../data/types';

function WeaponStatistics() { 
  const [weaponStats, setWeaponStats] = useState<IWeaponStats[] | undefined>(undefined)
  
  useEffect(() => {
    setWeaponStats(WeaponStats as unknown as IWeaponStats[])
  }, [setWeaponStats, WeaponStats])

  return (
    <div className="weapon-stats-container" />
  )
}

export default WeaponStatistics