import './ArtifactSetPage.css';

import { find, forEach, isEmpty, map, orderBy, reduce, take } from 'lodash';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { getArtifactSetNames, getPercentage, getShortName } from '../../scripts/util';
import Button from '../controls/Button';
import useApi from '../hooks/useApi';
import useExpand from '../hooks/useExpand';
import { useAppSelector } from '../hooks/useRedux';
import HorizontalBarChart, { IBarChartData } from '../ui/HorizontalBarChart';
import { ChevronDown, ChevronUp } from '../ui/Icons';
import Loader from '../ui/Loader';
import ScrollContainer from 'react-indiana-drag-scroll';
import { colors } from 'react-select/src/theme';
import ArtifactSetBuildDetail from '../characters/builds/ArtifactSetBuildDetail';
import WeaponBuild from '../characters/builds/WeaponBuild';
import ArtifactSetBuildCard from './ArtifactSetBuildCard';
import Chart from '../ui/Chart';

function ArtifactSetPage() { 
  const { shortName } = useParams();
  console.log(shortName)
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const artifactSetBuildDb = useAppSelector((state) => state.data.artifactSetBuildDb)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const { expanded, handleExpand } = useExpand(window.innerWidth > 1036);
  const artifactSet = find(artifactSetDb, artifactSet => getShortName(artifactSet) === shortName)

  if (!artifactSet) return null;
 
  const [activeBuildIdx, setActiveBuildIdx] = useState(0);
  const artifactSetStats = useApi(`/artifactSets/${artifactSet._id}.json`)

  if (!artifactSetStats || isEmpty(artifactSetDb) || isEmpty(artifactSetStats)) return <Loader />

  const charsTotal = reduce(artifactSetStats.characters, (sum, curr) => sum + curr.count, 0)
  const max = 10;
  let labels: string[] = [];
  let data: number[] = [];
  let colors: string[] = [];
  let countSum = 0; 

  forEach(artifactSetStats.artifactSetBuilds, ({ artifactSetBuildId, total }) => {
    const label = getArtifactSetNames(artifactSetBuildDb[artifactSetBuildId].sets, artifactSetDb)
    if (!label) {
      return;
    }
    
    labels.push(label);
    data.push(total);
    countSum += total;
  })


  const handleSelectSet = (i: number) => {
    setActiveBuildIdx(i);
  }

  return (
    <div className="artifact-set-page">
        <div className="artifact-set-builds-selector">
        <ScrollContainer vertical={false} hideScrollbars={true} className="artifact-set-builds-menu">
          {map(artifactSetStats.artifactSetBuilds, (build, i) => {
              return (
                <div key={`artifacts-thumb-${i}`} onClick={() => handleSelectSet(i)}>
                  <ArtifactSetBuildCard id={build.artifactSetBuildId}selected={i === activeBuildIdx} selector={true} />
                </div>
              )
            })
          }
        </ScrollContainer>
      </div>
      <div className="artifact-set-characters">
        <h1>Characters</h1>
        <HorizontalBarChart data={take(orderBy(artifactSetStats.characters, 'count', 'desc'), expanded ? max : 5) as unknown as IBarChartData[]} db={characterDb} path='characters' total={charsTotal} color={''} />
        <br />
        {artifactSetStats.length > 5 && (
          <Button className="characters-show-more" onClick={handleExpand}>
            {!expanded ? <>Show more <ChevronDown size={20} /></> : <>Show less <ChevronUp size={20} /></>}
          </Button>
        )}
      </div>
      <div className="build-details">
        <div className="artifact-set-build-container">
          <div className="artifact-set-build-stats">
            <ArtifactSetBuildDetail
              id={artifactSetStats.artifactSetBuilds[activeBuildIdx].artifactSetBuildId}
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
              <div className="artifact-popularity">{getPercentage(artifactSetStats.artifactSetBuilds[activeBuildIdx].total, countSum)}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtifactSetPage