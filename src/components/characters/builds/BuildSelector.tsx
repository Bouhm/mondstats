import './BuildSelector.css';
import './Weapon.css';

import AmberSad from '/assets/amberSad.webp';
import _, { forEach, map, orderBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { ElementColors } from '../../../data/constants';
import { IBuild } from '../../../data/types';
import { getArtifactSetNames, getPercentage } from '../../../scripts/util';
import ArtifactSetBuild from '../../artifact-sets/ArtifactSetBuild';
import { FiltersType } from '../../hooks/useFilters';
import { useAppSelector } from '../../hooks/useRedux';
import Chart from '../../ui/Chart';
import LLImage from '../../ui/LLImage';
import ArtifactBuild from './ArtifactBuild';
import WeaponBuild from './WeaponBuild';

type BuildSelectorProps = {
  builds: IBuild[],
  total: number,
  filters: FiltersType,
  color: string
}

function BuildSelector({ builds, color, total, filters }: BuildSelectorProps) {
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const [activeBuildIdx, setActiveBuildIdx] = useState(0)

  const filteredBuilds = orderBy(builds, 'count', 'desc');
  let labels: string[] = [];
  let data: number[] = [];
  let colors: string[] = [];
  let countSum = 0; 

  forEach(filteredBuilds, build => {
    const label = getArtifactSetNames(build.artifacts, artifactSetDb)
    
    labels.push(label);
    data.push(build.count);
    countSum += build.count;
  })

  colors = Array(labels.length).fill(ElementColors.none)
  colors[activeBuildIdx] = color;

  const handleSelectSet = (i: number) => {
    setActiveBuildIdx(i);
  }

  return (
    <div className="character-builds">
      <div className="artifacts-selector">
        <ScrollContainer vertical={false} hideScrollbars={true} className="artifacts-menu">
          {map(filteredBuilds, (build, i) => {
              return (
                <div key={`artifacts-thumb-${i}`} onClick={() => handleSelectSet(i)}>
                  <ArtifactSetBuild artifacts={build.artifacts} color={color} selected={i === activeBuildIdx} selector={true} />
                </div>
              )
            })
          }
        </ScrollContainer>
      </div>
      <div className="build-details">
        <WeaponBuild
          weaponBuilds={filteredBuilds[activeBuildIdx].weapons}
          total={filteredBuilds[activeBuildIdx].count}
          color={color}
          filters={filters}
        />
        <div className="artifact-build-container">
          <div className="artifact-build-stats">
            <ArtifactBuild
              artifacts={filteredBuilds[activeBuildIdx].artifacts}
            />
            <div className="artifacts-donut-container">
              <div className="artifacts-donut-chart">
                <Chart.Donut
                  id="artifacts-donut"
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