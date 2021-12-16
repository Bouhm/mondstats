import './BuildSelector.scss';

import AmberSad from '/assets/amberSad.webp';
import _, { every, filter, forEach, map, orderBy, reduce } from 'lodash';
import React, { useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { ElementColors } from '../../../data/constants';
import { IBuild } from '../../../data/types';
import { getArtifactSetNames, getPercentage } from '../../../scripts/util';
import ArtifactSetBuildCard from '../../artifact-sets/ArtifactSetBuildCard';
import { FiltersType } from '../../hooks/useFilters';
import { useAppSelector } from '../../hooks/useRedux';
import Chart from '../../ui/Chart';
import LLImage from '../../ui/LLImage';
import ArtifactSetBuildDetail from './ArtifactSetBuildDetail';
import WeaponBuild from './WeaponBuild';

type BuildSelectorProps = {
  builds: IBuild[],
  total: number,
  filters: FiltersType,
  color: string
}

function BuildSelector({ builds, color, total, filters }: BuildSelectorProps) { 
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const artifactSetBuildDb = useAppSelector((state) => state.data.artifactSetBuildDb)
  const [activeBuildIdx, setActiveBuildIdx] = useState(0)

  const filteredBuilds = builds;
  let labels: string[] = [];
  let data: number[] = [];
  let colors: string[] = [];
  let countSum = 0; 

  forEach(filteredBuilds, ({ artifactSetBuildId, count }) => {
    const label = getArtifactSetNames(artifactSetBuildDb[artifactSetBuildId].sets, artifactSetDb)
    if (!label) {
      return;
    }
    
    labels.push(label);
    data.push(count);
    countSum += count;
  })

  colors = Array(labels.length).fill(ElementColors.none)
  colors[activeBuildIdx] = color;

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
                  <ArtifactSetBuildCard id={build.artifactSetBuildId} color={color} selected={i === activeBuildIdx} selector={true} />
                </div>
              )
            })
          }
        </ScrollContainer>
      </div>
      <div className="build-details">
        <WeaponBuild
          weapons={filteredBuilds[activeBuildIdx].weapons}
          total={reduce(filteredBuilds[activeBuildIdx].weapons, (sum, curr) => sum + curr.count, 0)}
          color={color}
          filters={filters}
        />
        <div className="artifact-set-build-container">
          <div className="artifact-set-build-stats">
            <ArtifactSetBuildDetail
              id={filteredBuilds[activeBuildIdx].artifactSetBuildId}
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