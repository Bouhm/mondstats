import './BuildCharts.scss';

import { every, filter, forEach, map, orderBy, reduce, take } from 'lodash';
import React, { ReactNode, useEffect, useState } from 'react';

import * as colorVars from '../../_variables.module.scss';
import { IBuild } from '../../data/types';
import { getArtifactSetBuildAbbreviation, getArtifactSetNames, getPercentage } from '../../scripts/util';
import ArtifactSetBuildCard from '../artifactSets/ArtifactSetBuildCard';
import ArtifactSetBuildDetail from '../artifactSets/ArtifactSetBuildDetail';
import { FiltersType } from '../hooks/useFilters';
import { useAppSelector } from '../hooks/useRedux';
import Chart from '../ui/Chart';
import HorizontalBarChart, { IBarChartData } from '../ui/HorizontalBarChart';
import WeaponDetail from '../weapons/WeaponDetail';
import { NumberParam, StringParam, useQueryParams, withDefault } from 'use-query-params';

type ArtifactSetBuildChartProps = {
  builds: any,
  activeBuildIdx: number,
}
function ArtifactSetBuildChart({ builds, activeBuildIdx }: ArtifactSetBuildChartProps) {
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const artifactSetBuildDb = useAppSelector((state) => state.data.artifactSetBuildDb)
  const colorClass = useAppSelector((state) => state.data.colorClass)

  let labels: string[] = [];
  let data: number[] = [];
  let colors: string[] = [];
  let countSum = 0; 

  forEach(builds, ({ _id, count }) => {
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

  return (
    <div className="build-artifact-sets">
      <h1>Artifacts</h1>
      <div className="artifact-set-build-charts">
        <div className="artifact-set-build-detail-container">
        <ArtifactSetBuildDetail sets={artifactSetBuildDb[builds[activeBuildIdx]._id].sets} />
        </div>
        <div className="artifact-set-builds-donut-container">
          <div className="artifact-set-builds-donut-chart">
            <Chart.Donut
              id="artifact-set-builds-donut"
              labels={labels}
              data={data}
              colors={colors}
              max={countSum}
              showScale={false}
            />
          </div>
          <div className="artifact-popularity">{getPercentage(builds[activeBuildIdx].count, countSum)}%</div>
        </div>
      </div>
    </div>
  )
}


type BuildChartsProps = {
  builds?: any,
  stats?: any,
  filters?: FiltersType
}

function Weapons({ stats, filters }: BuildChartsProps) {
  const weaponDb = useAppSelector((state) => state.data.weaponDb)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const colorClass = useAppSelector((state) => state.data.colorClass)
  const [activeBuildIdx, setActiveBuildIdx] = useState(0)
  const charsTotal = reduce(stats.characters, (sum, curr) => sum + curr.count, 0)

  const weapon = weaponDb[stats._id]

  return (
    <div className='build-charts-container'>
      <div className="build-charts">
        <div className="build-characters">
          <h1>Characters</h1>
            <HorizontalBarChart data={orderBy(stats.characters, 'count', 'desc') as unknown as IBarChartData[]} db={characterDb} path='characters' total={charsTotal} />
          <br />
        </div>
        <div className="build-weapon-detail">
          <h1>Weapon</h1>
            <WeaponDetail weapon={weapon} />
        </div>
      </div>
    </div>
  )
}

function CharacterBuilds({ builds, filters }: BuildChartsProps) {
  const weaponDb = useAppSelector((state) => state.data.weaponDb)
  const artifactSetBuildDb = useAppSelector((state) => state.data.artifactSetBuildDb)
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const filteredBuilds = filter(builds, ({ _id })=> !!artifactSetBuildDb[_id])

  const [query, setQuery] = useQueryParams({
    buildIndex: withDefault(NumberParam, 0),
  })
  
  const [activeBuildIdx, setActiveBuildIdx] = useState(query.buildIndex ? query.buildIndex : 0)
  const weaponsTotal = reduce(filteredBuilds[activeBuildIdx].weapons, (sum, curr) => sum + curr.count, 0);

  const handleSelectSet = (i: number) => {
    setQuery({ buildIndex: i });
    setActiveBuildIdx(i);
  }

  return (
    <div className='build-charts-container'>
      <div className="artifact-set-builds-selector">
        {map(builds, (build, i: number) => {
          return (
            <div key={`artifacts-thumb-${i}`} onClick={() => handleSelectSet(i)}>
              <ArtifactSetBuildCard id={build._id} selected={i === activeBuildIdx} selector={true} />
            </div>
          )})
        }
      </div>
      <div className='build-charts'>
        <div className="build-weapons">
          <h1>Weapons</h1>
          <HorizontalBarChart data={orderBy(filteredBuilds[activeBuildIdx].weapons, 'count', 'desc') as unknown as IBarChartData[]} db={weaponDb} path='weapons' total={weaponsTotal} />
        </div>
        <ArtifactSetBuildChart builds={filteredBuilds} activeBuildIdx={activeBuildIdx} />
      </div>
    </div>
  )
}

function ArtifactSetBuilds({ builds, filters }: BuildChartsProps) {
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const [activeBuildIdx, setActiveBuildIdx] = useState(0)
  const charsTotal = reduce(builds[activeBuildIdx].characters, (sum, curr) => sum + curr.count, 0)

  const handleSelectSet = (i: number) => {
    setActiveBuildIdx(i);
  }

  return (
    <div className='build-charts-container'>
      <div className="artifact-set-builds-selector">
        {map(builds, (build, i: number) => {
          return (
            <div key={`artifacts-thumb-${i}`} onClick={() => handleSelectSet(i)}>
              <ArtifactSetBuildCard id={build._id} selected={i === activeBuildIdx} selector={true} />
            </div>
          )})
        }
      </div>
      <div className='build-charts'>
        <div className="build-characters">
          <h1>Characters</h1>
          <HorizontalBarChart data={orderBy(builds[activeBuildIdx].characters, 'count', 'desc') as unknown as IBarChartData[]} db={characterDb} path='characters' total={charsTotal} />
        </div>
        <ArtifactSetBuildChart builds={builds} activeBuildIdx={activeBuildIdx} />
      </div>
    </div>
  )
}

export default { Weapons, ArtifactSetBuilds, CharacterBuilds }