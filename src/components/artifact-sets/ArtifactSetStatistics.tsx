import './ArtifactSetStatistics.css';

import { filter, flatten, includes, intersection, isEmpty, map, reduce, some, union, uniq } from 'lodash';
import React, { useState } from 'react';

import useApi from '../hooks/useApi';
import { useAppSelector } from '../hooks/useRedux';
import StatsTable from '../stats/StatsTable';
import CardSearch, { SearchItem } from '../ui/CardSearch';
import Loader from '../ui/Loader';
import { KEYWORDS } from '../ui/Searchbar';

function ArtifactSetStatistics() { 
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const artifactSetStats = useApi(`/artifacts/top-artifactsets.json`)
  const [selectedSets, setSelectedSets] = useState<string[]>([])

  if (isEmpty(artifactSetDb) || isEmpty(artifactSetStats)) return <Loader />

  const artifactSetItems = map(uniq(reduce(artifactSetStats, (arr, curr) => flatten([...arr, ...map(curr.artifacts, artifact => artifact._id)]) as unknown as any, [])), (_id) => {
    const set = artifactSetDb[_id]

    return ({
      _id,
      name: set.name,
      oid: set.oid,
      rarity: set.rarity,
      keys: uniq(flatten(map(set.affixes, affix => (
        filter(KEYWORDS, key => includes(affix.effect.toLowerCase(), key))
      )))).join(" ")
    })
  });

  const handleSelect = (selectedIds: string[]) => {
    setSelectedSets(selectedIds)
  }
    
  return (
    <div className="artifact-set-stats-container">
      <CardSearch.ArtifactSets items={filter(artifactSetItems, set => !includes(selectedSets, set._id))} onSelect={handleSelect} />
      <StatsTable.ArtifactSetStatistics data={isEmpty(selectedSets) ? artifactSetStats : filter(artifactSetStats, set => intersection(selectedSets, map(set.artifacts, artifact => artifact._id)).length > 0)} />
    </div>
  )
}

export default ArtifactSetStatistics