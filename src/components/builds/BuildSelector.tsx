import './BuildSelector.css';
import './artifacts/Artifact.css';
import './weapons/Weapon.css';

import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';

import { IBuild } from '../../data/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Chart, { IChartConfig } from '../ui/Chart';
import ArtifactBuild from './artifacts/ArtifactBuild';
import ArtifactSets from './artifacts/ArtifactSets';
import elemColors from './colors';
import WeaponBuild from './weapons/WeaponBuild';

function BuildSelector({ builds, total }: { builds: IBuild[] } & { total: number }) {
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const elementColor = useAppSelector((state) => state.data.elementColor)
  
  const [activeBuildIdx, setActiveBuildIdx] = useState(0)
  const [chartConfig, setChartConfig] = useState<IChartConfig>({
    labels: [],
    data: [],
    colors: []
  })
  let countSum = 0;

  const orderedBuilds = _.orderBy(builds, 'count', 'desc');

  useEffect(() => {
    if (_.isEmpty(artifactSetDb)) {
      let labels: string[] = []
      let data: number[] = []
      let colors: string[] = []
      
      _.forEach(orderedBuilds, build => {
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
  
      colors = Array(labels.length).fill("#a4a4a4")
      colors[activeBuildIdx] = elementColor;
  
      setChartConfig({
        labels, data, colors
      })
    }
  }, [artifactSetDb])

  console.log(orderedBuilds)

  return (
    <div className="builds-selector">
      <WeaponBuild
        weapons={orderedBuilds[activeBuildIdx].weapons}
        total={orderedBuilds[activeBuildIdx].count}
      />
      <div className="artifact-build-container">
        <div className="artifact-build-stats">
          <ArtifactBuild
            artifacts={orderedBuilds[activeBuildIdx].artifacts}
          />
          <div className="artifacts-donut-chart">
            <Chart
              id="artifacts-donut"
              type="doughnut"
              labels={chartConfig.labels}
              data={chartConfig.data}
              colors={chartConfig.colors}
              max={countSum}
              showScale={false}
            />
            <div className="artifact-popularity">{Math.round((orderedBuilds[activeBuildIdx].count / countSum) * 100)}%</div>
          </div>
        </div>
        <div className="character-builds-selector">
          {_.map(orderedBuilds, (build, i) => {
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