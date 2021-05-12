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
  const [{ characterDb, selectedCharacter, artifactDb }] = useContext(Store)
  const [activeBuildIdx, setActiveBuildIdx] = useState(0)
  const getArtifactSet = (id: number) => _.find(artifactDb, { pos: 1, set: { id } });

  let labels: string[] = [];
  let data: number[] = [];
  let colors: string[] = [];

  _.forEach(_.orderBy(builds, 'count', 'desc'), build => {
    let label = "";

    _.forEach(build.artifacts, (artifact, i) => {
      let name = getArtifactSet(artifact.id)!.set.name;
      if (name.includes(" ")) {
        name = name.split(" ")[0]
      }
      label += artifact.activation_number + "-" + name
      if (i !== build.artifacts.length - 1) label += " "
    })

    labels.push(label);
    data.push(build.count);
  })

  colors = Array(labels.length).fill("#a4a4a4")
  colors[activeBuildIdx] = elemColors[characterDb[selectedCharacter].element.toLocaleLowerCase()];

  return (
    <div className="builds-selector">
      <div className="character-builds-container">
        <div className="build-container">
          <WeaponBuild
            weapons={builds[activeBuildIdx].weapons}
            total={builds[activeBuildIdx].count}
          />
          <div className="artifact-build-container">
            <ArtifactBuild
              artifacts={builds[activeBuildIdx].artifacts}
            />
            <div className="artifacts-donut-chart">
              <Chart
                id="artifacts-donut"
                type="doughnut"
                labels={labels}
                data={data}
                colors={colors}
              />
              <div className="artifact-popularity">{Math.round((builds[activeBuildIdx].count / total) * 100)}%</div>
            </div>
          </div>
        </div>
        {builds[activeBuildIdx].count}
      </div>
      <div className="character-builds-selector">
        {_.map(builds, (build, i) => {
          return (
            <div key={`artifacts-thumb=${i}`} className={`${activeBuildIdx === i ? "selected" : ""}`} onClick={() => setActiveBuildIdx(i)}>
              <ArtifactSets artifacts={build.artifacts} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BuildSelector