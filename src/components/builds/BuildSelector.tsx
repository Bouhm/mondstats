import './BuildSelector.css';
import './artifacts/Artifact.css';
import './weapons/Weapon.css';

import _ from 'lodash';
import React, { useContext, useState } from 'react';

import { ICharArtifact, ICharWeapon } from '../../data/types';
import { Store } from '../../Store';
import Chart from '../ui/Chart';
import ArtifactBuild from './artifacts/ArtifactBuild';
import ArtifactSets from './artifacts/ArtifactSets';
import elemColors from './colors';
import WeaponBuild from './weapons/WeaponBuild';

type BuildSelectProps = {
  artifacts: ICharArtifact[], 
  weapons: ICharWeapon[]
}

function BuildSelector({ artifacts, weapons }: BuildSelectProps) {
  const [{ characterDb, selectedCharacter, artifactDb }] = useContext(Store)
  const [activeBuildIdx, setActiveBuildIdx] = useState(0)
  const getArtifactSet = (id: number) => _.find(artifactDb, { pos: 5, set: { id } });

  const orderedArtifacts = _.orderBy(artifacts, 'count', 'desc');
  const orderedWeapons = _.orderBy(_.filter(weapons, weapon => {
      return _.includes(_.keys(weapon.weaponCount), orderedArtifacts[activeBuildIdx].buildId)
    }), (weapon) => {
    return weapon.weaponCount[orderedArtifacts[activeBuildIdx].buildId]
  })


  let labels: string[] = [];
  let chartData: number[] = [];
  let colors: string[] = [];
  let countSum = 0;

  _.forEach(orderedArtifacts, ({ sets, count }) => {
    let label = "";

    _.forEach(sets, (artifact, i) => {
      let name = getArtifactSet(artifact.id)!.set.name;
      if (name.includes(" ")) {
        if (name.split(" ")[0] === "The") {
          name = name.split(" ")[1]
        } else {
          name = name.split(" ")[0]
        }
      }
      label += artifact.activation_number + "-" + name
      if (i !== artifacts.length - 1) label += " "
    })

    labels.push(label);
    chartData.push(count);
    countSum += count;
  })

  colors = Array(labels.length).fill("#a4a4a4")
  colors[activeBuildIdx] = elemColors[characterDb[selectedCharacter].element.toLowerCase()];

  return (
    <div className="builds-selector">
      <WeaponBuild
        weapons={orderedWeapons}
        total={countSum}
      />
      <div className="artifact-build-container">
        <div className="artifact-build-stats">
          <ArtifactBuild
            artifacts={orderedArtifacts[activeBuildIdx].sets}
          />
          <div className="artifacts-donut-chart">
            <Chart
              id="artifacts-donut"
              type="doughnut"
              labels={labels}
              data={chartData}
              colors={colors}
              max={countSum}
              showScale={false}
            />
            <div className="artifact-popularity">{Math.round((orderedArtifacts[activeBuildIdx].count / countSum) * 100)}%</div>
          </div>
        </div>
        <div className="character-builds-selector">
          {_.map(orderedArtifacts, ({ sets }, i) => {
            return (
              <div key={`artifacts-thumb=${i}`} onClick={() => setActiveBuildIdx(i)}>
                <ArtifactSets artifacts={sets} selected={activeBuildIdx === i} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BuildSelector