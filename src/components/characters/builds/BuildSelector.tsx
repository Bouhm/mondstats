import './BuildSelector.css';
import './Weapon.css';

import _, { forEach, map, orderBy } from 'lodash';
import React, { useEffect, useState } from 'react';

import { ElementColors } from '../../../data/constants';
import { IBuild } from '../../../data/types';
import ArtifactSets from '../../artifact-sets/ArtifactSets';
import { Filters } from '../../filters/useFilters';
import { useAppSelector } from '../../hooks/useRedux';
import Chart from '../../ui/Chart';
import ArtifactBuild from './ArtifactBuild';
import WeaponBuild from './WeaponBuild';
import ScrollContainer from 'react-indiana-drag-scroll';

type BuildSelectorProps = {
  builds: IBuild[],
  total: number,
  filters: Filters,
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
    let label = "";

    forEach(build.artifacts, (set, i) => {
      let name = artifactSetDb[set._id].name;
      if (name.includes(" ")) {
        if (name.split(" ")[0] === "The") {
          name = name.split(" ")[1]
        } else {
          name = name.split(" ")[0]
        }
      }
      label += set.activation_number + "-" + name
      if (i !== build.artifacts.length - 1) label += " "
    })

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
                  <ArtifactSets artifacts={build.artifacts} color={color} selected={i === activeBuildIdx} selector={true} />
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
                <Chart
                  id="artifacts-donut"
                  type="doughnut"
                  labels={labels}
                  data={data}
                  colors={colors}
                  max={countSum}
                  showScale={false}
                />
                </div>
              <div className="artifact-popularity">{Math.round((filteredBuilds[activeBuildIdx].count / countSum) * 100)}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuildSelector