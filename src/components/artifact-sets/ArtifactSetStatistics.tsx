import './ArtifactSetStatistics.css';

import _, { filter, flatten, includes, map } from 'lodash';
import React, { useEffect, useState } from 'react';

import ItemSearch, { SearchItem } from '../filters/ItemSearch';
import useApi from '../hooks/useApi';
import { useAppSelector } from '../hooks/useRedux';
import { KEYWORDS } from '../ui/Searchbar';

function ArtifactSetStatistics() { 
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const artifactSets = map(artifactSetDb, (set) => {
    console.log(set.name, flatten(map(set.affixes, affix => (
      filter(KEYWORDS, key => includes(affix.effect.toLowerCase(), key))
    ))).join(" "))

    return ({
    _id: set._id,
    name: set.name,
    rarity: set.rarity,
    imgUrl: `/assets/artifacts/${set.oid}.webp`,
    keys: map(set.affixes, affix => (
      filter(KEYWORDS, key => includes(affix.effect.toLowerCase(), key))
    )).join(" ")
  })
  });
  const artifactSetStats = useApi(`https://api.github.com/repos/bouhm/favonius-data/contents/artifacts/top-artifactsets.json`)


  const handleSelect = () => {

  }
  
  return (
    <div className="artifact-set-stats-container">
      <ItemSearch items={artifactSets} onSelect={handleSelect} />
      <div className="artifact-set-top">
      </div>
    </div>
  )
}

export default ArtifactSetStatistics
