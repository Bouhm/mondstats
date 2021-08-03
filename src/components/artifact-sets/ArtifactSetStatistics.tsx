import './ArtifactSetStatistics.css';

import _, { clone, filter, flatten, includes, isEmpty, map, uniq } from 'lodash';
import React, { useEffect, useState } from 'react';

import useApi from '../hooks/useApi';
import { useAppSelector } from '../hooks/useRedux';
import StatsTable from '../stats/StatsTable';
import CardSearch, { SearchItem } from '../ui/CardSearch';
import { KEYWORDS } from '../ui/Searchbar';

function ArtifactSetStatistics() { 
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const artifactSets = map(artifactSetDb, (set) => ({
    _id: set._id,
    name: set.name,
    rarity: set.rarity,
    imgUrl: `/assets/artifacts/${set.oid}.webp`,
    keys: uniq(flatten(map(set.affixes, affix => (
      filter(KEYWORDS, key => includes(affix.effect.toLowerCase(), key))
    )))).join(" ")
  }));

  const [selectedSets, setSelectedSets] = useState<string[]>([])

  const handleSelect = (id: string) => {
    setSelectedSets([...selectedSets, id])
  }
  
  if (isEmpty(artifactSetDb)) return null;
  
  return (
    <div className="artifact-set-stats-container">
      <CardSearch items={artifactSets} onSelect={handleSelect} />
      <StatsTable.ArtifactSetStatistics selected={selectedSets} />
    </div>
  )
}

export default ArtifactSetStatistics
