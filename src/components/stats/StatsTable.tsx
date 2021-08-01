import './StatsTable.scss';

import { map, reduce, take } from 'lodash';
import React, { useEffect, useState } from 'react';

import useApi from '../hooks/useApi';
import { useAppSelector } from '../hooks/useRedux';
import Card from '../ui/Card';

function ArtifactSets() {
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const artifactSetStats = useApi(`https://api.github.com/repos/bouhm/favonius-data/contents/artifacts/top-artifactsets.json`)
  const total = reduce(artifactSetStats, (sum: number, curr: any) => sum + curr.count, 0)

  if (!artifactSetStats || !artifactSetDb) return null;
  return (
    <div className="stats-table">
      {map(take(artifactSetStats, 10), (itemStat: any) => {
        return <>
          <div className="row-card">
            {map(itemStat.artifacts, artifactSet => {
              console.log(artifactSet._id, artifactSetDb)
              const { _id, name, rarity, oid } = artifactSetDb[artifactSet._id];
              const cardProps = {
                _id,
                name,
                rarity,
                imgUrl: `/assets/artifacts/${oid}.webp`
              }

              return <Card {...cardProps} />
            })}
          </div>
          <div className="row-stats">
            <div
              className={`row-stats-bar`} 
              style={{ width: `${Math.round((itemStat.count / total * 1000)/10)}%`}} 
            />
            </div>
          <div className="row-related">
          </div>
        </>
      })}
    </div>
  )
}

export default { ArtifactSets }
