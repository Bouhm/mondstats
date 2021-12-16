import './ArtifactSetIndex.css';

import { filter, includes, intersection, isEmpty, map } from 'lodash';
import React, { useState } from 'react';

import CardSearch, { SearchItem } from '../controls/CardSearch';
import useApi from '../hooks/useApi';
import useArtifactSetSearch from '../hooks/useArtifactSetSearch';
import { useAppSelector } from '../hooks/useRedux';
import StatsTable from '../stats/StatsTable';
import Loader from '../ui/Loader';

function ArtifactSetIndex() { 
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const [selectedSets, setSelectedSets] = useState<string[]>([])

  if (isEmpty(artifactSetDb)) return <Loader />

  const { searchArtifactSets } = useArtifactSetSearch(artifactSetDb);

  const handleSelect = (selectedIds: string[]) => {
    setSelectedSets(selectedIds)
  }
    
  return (
    <div className="artifact-set-stats-container">
      <CardSearch.ArtifactSets items={filter(searchArtifactSets as SearchItem[], set => !includes(selectedSets, set!._id))} onSelect={handleSelect} />
    </div>
  )
}

export default ArtifactSetIndex