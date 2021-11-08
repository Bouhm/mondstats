import './ArtifactSetTable.css';

import { filter, includes, intersection, isEmpty, map } from 'lodash';
import React, { useState } from 'react';

import CardSearch, { SearchItem } from '../controls/CardSearch';
import useApi from '../hooks/useApi';
import useArtifactSetSearch from '../hooks/useArtifactSetSearch';
import { useAppSelector } from '../hooks/useRedux';
import StatsTable from '../stats/StatsTable';
import Loader from '../ui/Loader';

function ArtifactSetTable() { 
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const artifactSetStats = useApi(`/artifacts/top-artifactsets.json`)
  const [selectedSets, setSelectedSets] = useState<string[]>([])

  if (isEmpty(artifactSetDb) || isEmpty(artifactSetStats)) return <Loader />

  const { searchArtifactSets } = useArtifactSetSearch(artifactSetDb, artifactSetStats.artifactSets);
  console.log(searchArtifactSets)

  const handleSelect = (selectedIds: string[]) => {
    setSelectedSets(selectedIds)
  }
    
  return (
    <div className="artifact-set-stats-container">
      <CardSearch.ArtifactSets items={filter(searchArtifactSets, set => set && !includes(selectedSets, set._id)) as unknown as SearchItem[]} onSelect={handleSelect} />
      <StatsTable.ArtifactSets data={isEmpty(selectedSets) ? artifactSetStats.artifactSets : filter(artifactSetStats.artifactSets, set => intersection(selectedSets, map(set.artifacts, artifact => artifact._id)).length > 0)} />
    </div>
  )
}

export default ArtifactSetTable