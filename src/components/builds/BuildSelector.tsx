import React, { useContext, useEffect, useRef, useState } from 'react'
import { Chart, ChartDataset, registerables } from "chart.js";
import _ from 'lodash'

import { Store } from '../../Store'
import { IBuild } from '../../data/types'
import ArtifactSets from './ArtifactSets'
import Weapon from './WeaponCard'
import ArtifactCard from './ArtifactCard'
import Colors from './colors'
import './BuildSelector.css'
import './Artifact.css'
import './Weapon.css'

function BuildSelector({ builds, total }: { builds: IBuild[] } & { total: number }) {
  const [{ artifactDb, weaponDb }] = useContext(Store)
  const [activeBuildIdx, setActiveBuildIdx] = useState(0)
  const donutRef = useRef(null)

  const getArtifactSet = (id: number) => _.find(artifactDb, { pos: 1, set: { id } });
  const getWeapon = (id: number) => _.find(weaponDb, { id });

  useEffect(() => {
    Chart.register(...registerables)

    let labels: string[] = [];
    let data: number[] = [];

    _.forEach(builds, build => {
      let label = "";

      _.forEach(build.artifacts, (artifact, i) => {
        label += artifact.activation_number + "-" + getArtifactSet(artifact.id)!.name;
        if (i !== build.artifacts.length - 1) label += ", "
      })

      labels.push(label);
      data.push(build.count);
    })

    if (donutRef && donutRef.current) {
      new Chart(donutRef.current!.getContext("2d"), {
        type: "doughnut",
        data: {
          labels,
          datasets: [
            {
              data
            }
          ]
        },
        options: {
          //Customize chart options
        }
      });
    }
  }, [donutRef, builds, activeBuildIdx, getArtifactSet, Chart])

  const renderSelectedBuild = () => {
    return (
      <div className="build-container">
        <div className="weapons-list">
          <h1>Weapons</h1>
          {_.map(_.orderBy(_.take(builds[activeBuildIdx].weapons, 8), 'count', 'desc'), ({ id, count }, i) => {
            const weapon = getWeapon(id);
            if (!weapon) return null;

            const popularity = Math.round((count / builds[activeBuildIdx].count) * 100);

            return (
              <div key={`${id}-${count}-${i}`} className="weapon-container">
                <Weapon {...weapon} popularity={popularity} />
                <div className="weapon-bar-container">
                  <div className={weapon.type_name.toLowerCase()} style={{ width: `${popularity}%` }} />
                </div>
              </div>
            )
          })}
        </div>
        <div className="artifact-build-container">
          <h1>Artifacts</h1>
          {_.map(builds[activeBuildIdx].artifacts, ({ id, activation_number }, i) => {
            const artifact = getArtifactSet(id);
            if (!artifact) return null;

            return <ArtifactCard key={`${id}-${i}`} {...artifact} activation={activation_number} affixes={artifact.set.affixes} />
          })}
          <div className="artifacts-donut-chart">
            <canvas id={"artifact-donut"} ref={donutRef} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="builds-selector">
      <div className="character-builds-container">
        {renderSelectedBuild()}
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