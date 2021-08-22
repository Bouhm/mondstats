import './ArtifactSetStatistics.css';

import { filter, includes, intersection, isEmpty, map } from 'lodash';
import React, { useState } from 'react';

import useApi from '../hooks/useApi';
import { useAppSelector } from '../hooks/useRedux';
import StatsTable from '../stats/StatsTable';
import CardSearch from '../ui/CardSearch';
import Loader from '../ui/Loader';
import useArtifactSetSearch from '../hooks/useArtifactSetSearch';

function ArtifactSetStatistics() { 
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const artifactSetStats = useApi(`/artifacts/top-artifactsets.json`)
  const [selectedSets, setSelectedSets] = useState<string[]>([])

  if (isEmpty(artifactSetDb) || isEmpty(artifactSetStats)) return <Loader />

  const { searchArtifactSets } = useArtifactSetSearch(artifactSetDb, artifactSetStats);

  const handleSelect = (selectedIds: string[]) => {
    setSelectedSets(selectedIds)
  }
    
  return (
    <div className="artifact-set-stats-container">
      <CardSearch.ArtifactSets items={filter(searchArtifactSets, set => !includes(selectedSets, set._id))} onSelect={handleSelect} />
      <StatsTable.ArtifactSetStatistics data={isEmpty(selectedSets) ? artifactSetStats : filter(artifactSetStats, set => intersection(selectedSets, map(set.artifacts, artifact => artifact._id)).length > 0)} />
    </div>
  )
}

export default ArtifactSetStatistics