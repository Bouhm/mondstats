import './ChartsPage.css';

import { filter, includes, intersection, isEmpty, map } from 'lodash';
import React, { useState } from 'react';

import useApi from '../hooks/useApi';
import useCharacterSearch from '../hooks/useCharacterSearch';
import { useAppSelector } from '../hooks/useRedux';
import Loader from '../ui/Loader';
import StatsTable from './StatsTable';

function ChartsPage() { 
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const characterStats = useApi(`/characters/top-characters.json`)
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([])

  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const artifactSetStats = useApi(`/artifacts/top-artifactsets.json`)
  const [selectedSets, setSelectedSets] = useState<string[]>([])

  if (isEmpty(artifactSetDb) || isEmpty(artifactSetStats)) return <Loader />

  if (isEmpty(characterDb) || isEmpty(characterStats)) return <Loader />


  const weaponDb = useAppSelector((state) => state.data.weaponDb)
  const weaponStats = useApi(`/weapons/top-weapons.json`)
  const [selectedWeapons, setSelectedWeapons] = useState<string[]>([])

  if (isEmpty(weaponDb) || isEmpty(weaponStats)) return <Loader />
    
  return (
    <div className="charts-page-container">
      <div className="charts-tabs"></div>
      <div className="charters-container">
        <StatsTable.Characters data={isEmpty(selectedCharacters) ? characterStats.characters : filter(characterStats.characters, character => includes(selectedCharacters, character._id))} /> 
        <StatsTable.ArtifactSets data={isEmpty(selectedSets) ? artifactSetStats.artifactSets : filter(artifactSetStats.artifactSets, set => intersection(selectedSets, map(set.artifacts, artifact => artifact._id)).length > 0)} />
        <StatsTable.Weapons data={isEmpty(selectedWeapons) ? weaponStats.weapons : filter(weaponStats.weapons, weapon => includes(selectedWeapons, weapon._id))} />
      </div>
    </div>
  )
}

export default ChartsPage