import './BuildSelector.scss';

import AmberSad from '/assets/amberSad.webp';
import _, { every, filter, forEach, map, orderBy, reduce } from 'lodash';
import React, { useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import * as colorVars from '../../../_variables.module.scss';
import { IBuild } from '../../../data/types';
import { getArtifactSetNames, getPercentage } from '../../../scripts/util';
import ArtifactSetBuildCard from '../../artifact-sets/ArtifactSetBuildCard';
import { FiltersType } from '../../hooks/useFilters';
import { useAppSelector } from '../../hooks/useRedux';
import Chart from '../../ui/Chart';
import { ChevronDown, ChevronRight } from '../../ui/Icons';
import LLImage from '../../ui/LLImage';
import ArtifactSetBuildDetail from './ArtifactSetBuildDetail';
import WeaponBuild from './WeaponBuild';

type BuildSelectorProps = {
  builds: IBuild[],
  total: number,
  filters: FiltersType,
}

function BuildSelector({ builds, total, filters }: BuildSelectorProps) { 
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const artifactSetBuildDb = useAppSelector((state) => state.data.artifactSetBuildDb)
  const colorClass = useAppSelector((state) => state.data.colorClass)
  const [activeBuildIdx, setActiveBuildIdx] = useState(0)

  const filteredBuilds = builds;
  let labels: string[] = [];
  let data: number[] = [];
  let colors: string[] = [];
  let countSum = 0; 

  forEach(filteredBuilds, ({ _id, count }) => {
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
    <div className="character-builds">
      <div className="artifact-set-builds-selector">
        <ScrollContainer vertical={false} hideScrollbars={true} className="artifact-set-builds-menu">
          {map(filteredBuilds, (build, i) => {
              return (
                <div key={`artifacts-thumb-${i}`} onClick={() => handleSelectSet(i)}>
                  <ArtifactSetBuildCard id={build._id} selected={i === activeBuildIdx} selector={true} />
                </div>
              )
            })
          }
        </ScrollContainer>
        <div className="artifact-set-builds-indicator">
          <ChevronRight />
        </div>
      </div>
      <div className="build-details">
        <WeaponBuild
          weapons={filteredBuilds[activeBuildIdx].weapons}
          total={reduce(filteredBuilds[activeBuildIdx].weapons, (sum, curr) => sum + curr.count, 0)}
          filters={filters}
        />
        <div className="artifact-set-build-stats-container">
          <div className="artifact-set-build-stats">
            <ArtifactSetBuildDetail
              id={filteredBuilds[activeBuildIdx]._id}
            />
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
              <div className="artifact-popularity">{getPercentage(filteredBuilds[activeBuildIdx].count, countSum)}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuildSelector