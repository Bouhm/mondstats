import './ArtifactSetStatistics.css';

import { filter, flatten, includes, isEmpty, map, reduce, uniq } from 'lodash';
import React, { useEffect, useState } from 'react';

import useApi from '../hooks/useApi';
import { useAppSelector } from '../hooks/useRedux';
import StatsTable from '../stats/StatsTable';
import CardSearch, { SearchItem } from '../ui/CardSearch';
import Loader from '../ui/Loader';
import { KEYWORDS } from '../ui/Searchbar';

function ArtifactSetStatistics() { 
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const artifactSetStats = useApi(`/artifacts/top-artifactsets.json`)
  
  if (isEmpty(artifactSetDb) || !artifactSetStats) return <Loader />

  const artifactSetIds = uniq(reduce(artifactSetStats, (arr, curr) => flatten([...arr, ...map(curr.artifacts, artifact => artifact._id)]) as unknown as any, []));

  return (
    <div className="artifact-set-stats-container">
      <CardSearch.ArtifactSets items={artifactSetIds} />
      <StatsTable.ArtifactSetStatistics data={artifactSetStats} />
    </div>
  )
}

export default ArtifactSetStatistics
