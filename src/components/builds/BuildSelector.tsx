import './BuildSelector.css';
import './artifacts/Artifact.css';
import './weapons/Weapon.css';

import _ from 'lodash';
import React, { useContext, useState } from 'react';

import { IBuild } from '../../data/types';
import { Store } from '../../Store';
import Chart from '../ui/Chart';
import ArtifactBuild from './artifacts/ArtifactBuild';
import ArtifactSets from './artifacts/ArtifactSets';
import elemColors from './colors';
import WeaponBuild from './weapons/WeaponBuild';

function BuildSelector({ builds, total }: { builds: IBuild[] } & { total: number }) {
  const [{ characterDb, selectedCharacter, artifactDb, characterBuilds }] = useContext(Store)
  const [activeBuildIdx, setActiveBuildIdx] = useState(0)
  const getArtifactSet = (id: number) => _.find(artifactDb, { pos: 5, set: { id } });

  console.log(characterDb[selectedCharacter].element.toLocaleLowerCase())
  const orderedBuilds = _.orderBy(builds, 'count', 'desc');
  let labels: string[] = [];
  let data: number[] = [];
  let colors: string[] = [];
  let countSum = 0;

  _.forEach(orderedBuilds, build => {
    let label = "";

    _.forEach(build.artifacts, (artifact, i) => {
      console.log(artifact.id)
      let name = getArtifactSet(artifact.id)!.set.name;
      if (name.includes(" ")) {
        if (name.split(" ")[0] === "The") {
          name = name.split(" ")[1]
        } else {
          name = name.split(" ")[0]
        }
      }
      label += artifact.activation_number + "-" + name
      if (i !== build.artifacts.length - 1) label += " "
    })

    labels.push(label);
    data.push(build.count);
    countSum += build.count;
  })

  colors = Array(labels.length).fill("#a4a4a4")
  colors[activeBuildIdx] = elemColors[characterDb[selectedCharacter].element.toLocaleLowerCase()];

  return (
    <div className="builds-selector">
      <div className="character-builds-container">
        <div className="build-container">
          <WeaponBuild
            weapons={orderedBuilds[activeBuildIdx].weapons}
            total={orderedBuilds[activeBuildIdx].count}
          />
          <div className="artifact-build-container">
            <ArtifactBuild
              artifacts={orderedBuilds[activeBuildIdx].artifacts}
            />
            <div className="artifacts-donut-chart">
              <Chart
                id="artifacts-donut"
                type="doughnut"
                labels={labels}
                data={data}
                colors={colors}
              />
              <div className="artifact-popularity">{Math.round((orderedBuilds[activeBuildIdx].count / countSum) * 100)}%</div>
            </div>
          </div>
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
  )
}

export default BuildSelector