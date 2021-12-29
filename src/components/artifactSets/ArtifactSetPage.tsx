import './ArtifactSetPage.scss';

import { filter, find, forEach, orderBy, reduce, take } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as colorVars from '../../_variables.module.scss';
import { getArtifactSetNames, getShortName } from '../../scripts/util';
import { setColorClass } from '../../Store';
import useApi from '../hooks/useApi';
import useExpand from '../hooks/useExpand';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import BuildCharts from '../stats/BuildCharts';
import UsageStats from '../stats/UsageStats';
import Empty from '../ui/Empty';
import Loader from '../ui/Loader';

function ArtifactSetPage() { 
  const { shortName } = useParams();
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const artifactSetBuildDb = useAppSelector((state) => state.data.artifactSetBuildDb)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const colorClass = useAppSelector((state) => state.data.colorClass)
  const { expanded, handleExpand } = useExpand(window.innerWidth > 1036);
  const artifactSet = find(artifactSetDb, artifactSet => getShortName(artifactSet) === shortName)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useAppDispatch()
  
  if (!artifactSet) return null;
 
  useEffect(() => {
    if (artifactSet) {
      dispatch(setColorClass('Red'))
    }
  }, [artifactSet])

  const [activeBuildIdx, setActiveBuildIdx] = useState(0);
  const artifactSetStats = useApi(`/artifactSets/${artifactSet._id}.json`)
  const artifactSetTotals = useApi(`/artifactSets/stats/top-artifact-set-builds.json`)

  useEffect(() => {
    if (artifactSetStats && artifactSetTotals) {
      setIsLoading(false)
    }
  }, [artifactSetStats, artifactSetTotals])
  
  if (!artifactSetStats || !artifactSetStats.artifactSetBuilds[activeBuildIdx]) return <Empty />
  if (isLoading) return <Loader />

  const charsTotal = reduce(artifactSetStats.artifactSetBuilds[activeBuildIdx].characters, (sum, curr) => sum + curr.count, 0)
  const max = 10;
  let labels: string[] = [];
  let data: number[] = [];
  let colors: string[] = [];
  let countSum = 0; 

  forEach(artifactSetStats.artifactSetBuilds, ({ _id, count }) => {
    const label = getArtifactSetNames(artifactSetBuildDb[_id].sets, artifactSetDb)
    if (!label) {
      return;
    }
    
    colors = Array(10).fill(colorVars.none)
    colors[activeBuildIdx] = colorVars[colorClass.toLowerCase()];

    labels.push(label);
    data.push(count);
    countSum += count;
  })

  const handleSelectSet = (i: number) => {
    setActiveBuildIdx(i);
  }

  return (
    <div className="artifact-set-page">
      <UsageStats count={artifactSetStats.artifactSetBuilds[activeBuildIdx].count} total={artifactSetTotals.totals.total} abyssCount={artifactSetStats.artifactSetBuilds[activeBuildIdx].abyssCount} abyssTotal={artifactSetTotals.totals.abyssTotal} />
      <BuildCharts.ArtifactSetBuilds builds={take(orderBy(filter(artifactSetStats.artifactSetBuilds, set => set.characters.length), 'count', 'desc'), 10)} />
    </div>
  )
}

export default ArtifactSetPage  