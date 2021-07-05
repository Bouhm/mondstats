import './CharacterStatistics.css';
import CharacterStats from '../../data/characterStats.json'

import React, { useEffect, useState } from 'react';
import { ICharacterStats } from '../../data/types';

function CharacterStatistics() { 
  const [characterStats, setCharacterStats] = useState<ICharacterStats[] | undefined>(undefined)
  
  useEffect(() => {
    setCharacterStats(CharacterStats as unknown as ICharacterStats[])
  }, [setCharacterStats, CharacterStats])

  return (
    <div className="character-stats-container" />
  )
}

export default CharacterStatistics