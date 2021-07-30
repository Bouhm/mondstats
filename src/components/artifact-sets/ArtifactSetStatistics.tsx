import './ArtifactSetStatistics.css';

import { difference, filter, map, orderBy, values } from 'lodash';
import React, { useEffect, useState } from 'react';

import { IArtifactSetStats } from '../../data/types';
import useApi from '../hooks/useApi';
import { useAppSelector } from '../hooks/useRedux';
import Searchbar, { ISearchItem } from '../ui/Searchbar';
import ArtifactSetTile from './ArtifactSetTile';

function ArtifactSetStatistics() { 
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const artifactSets = map(artifactSetDb, ({ _id, name }) => ({ _id, name }));
  const artifactSetStats = useApi(`https://api.github.com/repos/bouhm/favonius-data/contents/artifacts/top-artifactsets.json`)

  const [filteredSets, setFilteredSets] = useState<ISearchItem[]>([]);

  useEffect(() => {
    setFilteredSets(filteredSets)
  }, [setFilteredSets])

  // Set character search filter
  const handleSearchArtifactSet = (filteredSets: ISearchItem[]) => {
    setFilteredSets(filteredSets);    
  }

  const handleSelect = () => {

  }
  
  return (
    <div className="artifact-set-stats-container">
      <div className="artifact-set-searchbar">
        <Searchbar maxResults={4} onSearch={handleSearchArtifactSet} list={artifactSetStats} placeholder="Search artifact sets&hellip;" />
      </div>
      <div className="artifact-set-tiles">
        <div className="searched-artifact-sets">
          {map(filteredSets, ({_id, name}) => (
            <ArtifactSetTile onClick={handleSelect} key={_id} id={_id} />
          ))}
        </div>
        <div className="unfiltered-artifact-sets">
          {map(orderBy(difference(artifactSets, filteredSets), 'name', 'desc'), ({_id, name}) => (
            <ArtifactSetTile onClick={handleSelect} key={_id} id={_id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ArtifactSetStatistics
