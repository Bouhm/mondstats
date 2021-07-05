import './AbyssTeams.css';

import AbyssBattles from '../../data/abyssBattles.json'
import React, { useEffect, useState } from 'react';
import { IAbyssBattle } from '../../data/types';

function AbyssTeams() { 
  const [abyssBattles, setAbyssBattles] = useState<IAbyssBattle[] | undefined>(undefined)
  
  useEffect(() => {
    setAbyssBattles(AbyssBattles)
  }, [setAbyssBattles, AbyssBattles])


  return (
    <div className="abyss-teams-container" />
  )
}

export default AbyssTeams