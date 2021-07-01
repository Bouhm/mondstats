import './BuildSelector.css';
import './artifacts/Artifact.css';
import './weapons/Weapon.css';

import _ from 'lodash';
import React, { useState } from 'react';

import { IBuild } from '../../data/types';
import { useAppSelector } from '../../hooks';
import Chart from '../ui/Chart';
import ArtifactBuild from './artifacts/ArtifactBuild';
import ArtifactSets from './artifacts/ArtifactSets';
import elemColors from './colors';
import WeaponBuild from './weapons/WeaponBuild';

type BuildSelectorProps = {
  builds: IBuild[],
  total: number,
  f2p: boolean
}

function BuildSelector({ builds, total, f2p }: BuildSelectorProps) {
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const elementColor = useAppSelector((state) => state.data.elementColor)
  const [activeBuildIdx, setActiveBuildIdx] = useState(0)

  const filteredBuilds = _.orderBy(builds, 'count', 'desc');
  let labels: string[] = [];
  let data: number[] = [];
  let colors: string[] = [];
  let countSum = 0; 

  _.forEach(filteredBuilds, build => {
    let label = "";

    _.forEach(build.artifacts, (set, i) => {
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

  colors = Array(labels.length).fill(elemColors.none)
  colors[activeBuildIdx] = elementColor;

  return (
    <div className="builds-selector">
      <WeaponBuild
        weapons={filteredBuilds[activeBuildIdx].weapons}
        total={filteredBuilds[activeBuildIdx].count}
        f2p={f2p}
      />
      <div className="artifact-build-container">
        <div className="artifact-build-stats">
          <ArtifactBuild
            artifacts={filteredBuilds[activeBuildIdx].artifacts}
          />
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
            <div className="artifact-popularity">{Math.round((filteredBuilds[activeBuildIdx].count / countSum) * 100)}%</div>
          </div>
        </div>
        <div className="character-builds-selector">
          {_.map(filteredBuilds, (build, i) => {
            return (
              <div key={`artifacts-thumb=${i}`} onClick={() => setActiveBuildIdx(i)}>
                <ArtifactSets artifacts={build.artifacts} selected={activeBuildIdx === i} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BuildSelector