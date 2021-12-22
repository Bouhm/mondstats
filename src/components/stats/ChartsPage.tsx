import './ChartsPage.scss';

import { filter, includes, intersection, isEmpty, map } from 'lodash';
import React, { useEffect, useState } from 'react';

import useApi from '../hooks/useApi';
import useCharacterSearch from '../hooks/useCharacterSearch';
import { useAppSelector } from '../hooks/useRedux';
import { useTabs } from '../hooks/useTabs';
import Loader from '../ui/Loader';
import Tabs from '../ui/Tabs';
import StatsTable from './StatsTable';

function ChartsPage() { 
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const topCharacters = useApi(`/characters/stats/top-characters.json`)

  const artifactSetBuildDb = useAppSelector((state) => state.data.artifactSetBuildDb)
  const topArtifactSetBuilds = useApi(`/artifactSets/stats/top-artifact-set-builds.json`)

  const weaponDb = useAppSelector((state) => state.data.weaponDb)
  const topWeapons = useApi(`/weapons/stats/top-weapons.json`)

  const tabs = ['characters', 'artifact sets', 'weapons']
  const { activeTabIdx, onTabChange } = useTabs();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (topCharacters && topArtifactSetBuilds && topWeapons) {
      setIsLoading(false)
    }
  }, [topCharacters, topArtifactSetBuilds, topWeapons])

  if (isLoading) return <Loader />
    
  const renderChart = () => {
    switch (activeTabIdx) {
      case 0:
        return <StatsTable.Characters data={topCharacters} />
      case 1:
        return <StatsTable.ArtifactSetBuilds data={topArtifactSetBuilds} />
      case 2:
        return <StatsTable.Weapons data={topWeapons} />
      default:
        return;
    }
  }

  return (
    <div className="charts-page-container">
      <Tabs activeTabIdx={activeTabIdx} onChange={onTabChange} tabs={tabs} />
      <div className="charts-container">
        {renderChart()}
      </div>
    </div>
  )
}

export default ChartsPage