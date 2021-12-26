import './BuildCharts.scss';

import AmberSad from '/assets/amberSad.webp';
import _, { every, filter, forEach, map, orderBy, reduce } from 'lodash';
import React, { ReactNode, useEffect, useState } from 'react';

import * as colorVars from '../../_variables.module.scss';
import { IBuild } from '../../data/types';
import { getArtifactSetNames, getPercentage } from '../../scripts/util';
import ArtifactSetBuildCard from '../artifactSets/ArtifactSetBuildCard';
import ArtifactSetInfo from '../artifactSets/ArtifactSetInfo';
import { FiltersType } from '../hooks/useFilters';
import { useAppSelector } from '../hooks/useRedux';
import Chart from '../ui/Chart';
import HorizontalBarChart, { IBarChartData } from '../ui/HorizontalBarChart';
import { ChevronDown, ChevronRight } from '../ui/Icons';
import LLImage from '../ui/LLImage';
import WeaponChart from '../weapons/WeaponChart';
import WeaponDetail from '../weapons/WeaponDetail';

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
      <div className="build-characters">
        <h1>Characters</h1>
          <HorizontalBarChart data={orderBy(stats.characters, 'count', 'desc') as unknown as IBarChartData[]} db={characterDb} path='characters' total={charsTotal} />
        <br />
      </div>
      <div className="build-weapon">
        <h1>Weapon</h1>
          <WeaponDetail weapon={weapon} />
      </div>
    </div>
  )
}

function CharacterBuilds({ builds, filters }: BuildChartsProps) {
  const weaponDb = useAppSelector((state) => state.data.weaponDb)
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const artifactSetBuildDb = useAppSelector((state) => state.data.artifactSetBuildDb)
  const colorClass = useAppSelector((state) => state.data.colorClass)
  const [activeBuildIdx, setActiveBuildIdx] = useState(0)
  const filteredBuilds = filter(builds, ({ _id })=> !!artifactSetBuildDb[_id])

  let labels: string[] = [];
  let data: number[] = [];
  let colors: string[] = [];
  let countSum = 0; 

  forEach(filteredBuilds, ({ _id, count }) => {
    if (artifactSetBuildDb[_id]) {
      const label = getArtifactSetNames(artifactSetBuildDb[_id].sets, artifactSetDb)
      if (!label) {
        return;
      }
      
      colors = Array(10).fill(colorVars.none)
      colors[activeBuildIdx] = colorVars[colorClass.toLowerCase()];
  
      labels.push(label);
      data.push(count);
      countSum += count;
    }
  })

  const weaponsTotal = reduce(filteredBuilds[activeBuildIdx].weapons, (sum, curr) => sum + curr.count, 0);

  const handleSelectSet = (i: number) => {
    setActiveBuildIdx(i);
  }
  console.log(filteredBuilds[activeBuildIdx])

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
      <div className="build-charts">
        <div className="build-characters">
          <h1>Weapons</h1>
            <HorizontalBarChart data={orderBy(filteredBuilds[activeBuildIdx].weapons, 'count', 'desc') as unknown as IBarChartData[]} db={weaponDb} path='weapons' total={weaponsTotal} />
          <br />
        </div>
        <div className="artifact-set-build-stats-container">
          <div className="artifact-set-build-stats">
            <div className="artifact-set-build-detail">
              <h1>Artifacts</h1>
              {map(artifactSetBuildDb[filteredBuilds[activeBuildIdx]._id].sets, ({ _id, activation_number }, i) => {
                const set = artifactSetDb[_id]
                if (!set) return null;

                return <ArtifactSetInfo key={`${_id}-${i}`} {...set} activation={activation_number} />
              })}
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
      </div>
    </div>
  )
}

function ArtifactSetBuilds({ builds, filters }: BuildChartsProps) {
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const artifactSetBuildDb = useAppSelector((state) => state.data.artifactSetBuildDb)
  const colorClass = useAppSelector((state) => state.data.colorClass)
  const [activeBuildIdx, setActiveBuildIdx] = useState(0)
  const charsTotal = reduce(builds[activeBuildIdx].characters, (sum, curr) => sum + curr.count, 0)

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

  const handleSelectSet = (i: number) => {
    setActiveBuildIdx(i);
  }

  return (
    <div className='build-charts-container'>
      <div className="build-characters">
        <h1>Characters</h1>
          <HorizontalBarChart data={orderBy(builds[activeBuildIdx].characters, 'count', 'desc') as unknown as IBarChartData[]} db={characterDb} path='characters' total={charsTotal} />
        <br />
      </div>
      <div className="artifact-set-build-stats-container">
        <div className="artifact-set-build-stats">
          <div className="artifact-set-build-detail">
            <h1>Artifacts</h1>
            {map(artifactSetBuildDb[builds[activeBuildIdx]._id].sets, ({ _id, activation_number }, i) => {
              const set = artifactSetDb[_id]
              if (!set) return null;

              return <ArtifactSetInfo key={`${_id}-${i}`} {...set} activation={activation_number} />
            })}
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
        <div className="artifact-set-builds-selector">
          <div className="artifact-set-builds-menu">
            {map(builds, (build, i: number) => {
                return (
                  <div key={`artifacts-thumb-${i}`} onClick={() => handleSelectSet(i)}>
                    <ArtifactSetBuildCard id={build._id} selected={i === activeBuildIdx} selector={true} />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default { Weapons, ArtifactSetBuilds, CharacterBuilds }