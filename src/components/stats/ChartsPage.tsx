import { map } from 'lodash';
import React, { useEffect, useState } from 'react';
import { StringParam, useQueryParams, withDefault } from 'use-query-params';

import useApi from '../hooks/useApi';
import { useTabs } from '../hooks/useTabs';
import Loader from '../ui/Loader';
import Tabs from '../ui/Tabs';
import StatsTable from './StatsTable';

function ChartsPage() { 
  const topCharacters = useApi(`/characters/stats/top-characters.json`)
  const topArtifactSetBuilds = useApi(`/artifactSets/stats/top-artifact-set-builds.json`)
  const topWeapons = useApi(`/weapons/stats/top-weapons.json`)

  const tabs = ['characters', 'artifacts', 'weapons']
  const [query, setQuery] = useQueryParams({
    chart: withDefault(StringParam, tabs[0]),
  });
  const { activeTabIdx, onTabChange } = useTabs(query.chart ? (tabs.indexOf(query.chart) || 0) : 0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (topCharacters && topArtifactSetBuilds && topWeapons) {
      setIsLoading(false)
    }
  }, [topCharacters, topArtifactSetBuilds, topWeapons]) 

  if (isLoading) return <Loader />
  
  const handleTabChange = (i: number) => {
    setQuery({ chart: tabs[i] }, 'replace');
    onTabChange(i)
  } 
    
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
      <Tabs activeTabIdx={activeTabIdx} onChange={handleTabChange} tabs={map(tabs, tab => <img src={`/assets/icons/${tab}.webp`} />)} />
      <div className="charts-container">
        {renderChart()}
      </div>
    </div>
  )
}

export default ChartsPage