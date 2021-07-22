import './BuildSelector.css';
import './Artifact.css';
import './Weapon.css';

import _ from 'lodash';
import React, { useEffect, useState } from 'react';

import { ElementColors } from '../../../data/constants';
import { IBuild } from '../../../data/types';
import { useAppSelector } from '../../../hooks';
import Chart from '../../ui/Chart';
import { EllipsisV } from '../../ui/Icons';
import ArtifactBuild from './ArtifactBuild';
import ArtifactSets from './ArtifactSets';
import WeaponBuild from './WeaponBuild';

type BuildSelectorProps = {
  builds: IBuild[],
  total: number,
  max5: number
}

function BuildSelector({ builds, total, max5 }: BuildSelectorProps) {
  const mobileWidth = window.matchMedia("(max-width: 617px)")
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const elementColor = useAppSelector((state) => state.data.elementColor)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(mobileWidth.matches)
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

  colors = Array(labels.length).fill(ElementColors.none)
  colors[activeBuildIdx] = elementColor;

  useEffect(() => {
    mobileWidth.addEventListener('change', () => {
      setIsMobile(mobileWidth.matches)
    })
  },[])

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const handleSelectSet = (i: number) => {
    setActiveBuildIdx(i);
    if (isMobile) setIsMenuOpen(false);
  }

  return (
    <div className="builds-selector">
      <WeaponBuild
        weaponBuilds={filteredBuilds[activeBuildIdx].weapons}
        total={filteredBuilds[activeBuildIdx].count}
        max5={max5}
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
        <div className="character-builds-selector">
          <div className="artifacts-menu-controls" >
            <div className={`artifacts-menu-button ${isMenuOpen ? "active" : ""}`} onClick={handleToggleMenu}>
              <EllipsisV color={"#000"} />
            </div>
          </div>
          <div className="artifacts-menu">
            {((isMenuOpen && isMobile) || !isMobile) &&
              _.map(filteredBuilds, (build, i) => {
                return (
                  <div key={`artifacts-thumb=${i}`} onClick={() => handleSelectSet(i)}>
                    <ArtifactSets artifacts={build.artifacts} selected={i === activeBuildIdx} />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuildSelector