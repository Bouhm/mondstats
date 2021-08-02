import './StatsTable.scss';

import { map, reduce, take } from 'lodash';
import React, { useEffect, useState } from 'react';

import { getCharacterFileName } from '../../scripts/util';
import ArtifactSets from '../characters/builds/ArtifactSets';
import useApi from '../hooks/useApi';
import { useAppSelector } from '../hooks/useRedux';

function renderCharacterStats(charIds: string[]) {
  const characterDb = useAppSelector((state) => state.data.characterDb)

  return (
    <>
      {map(charIds, charId => {
        const character = characterDb[charId]
        return <img className="character-stats" src={`/assets/characters/${getCharacterFileName(character)}.webp`} alt={character.name} />
      })}
    </>
  )
}

function ArtifactSetStatistics() {
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const artifactSetStats = useApi(`/artifacts/top-artifactsets.json`)
  const total = reduce(artifactSetStats, (sum: number, curr: any) => sum + curr.count, 0)

  if (!artifactSetStats || !artifactSetDb) return null;
  return (
    <div className="stats-table">
      {map(take(artifactSetStats, 10), (itemStat: any) => {
        return <>
          <div className="row-card">
            <ArtifactSets artifacts={itemStat.artifacts} color={'red'} />
          </div>
          <div className="row-stats">
            <div
              className={`row-stats-bar`} 
              style={{ width: `${Math.round((itemStat.count / total * 1000)/10)}%`}} 
            />
            <div className="row-stats-pct">{ `${Math.round((itemStat.count / total * 1000)/10)}%`}</div>
            </div>
          <div className="row-related">
            {renderCharacterStats(itemStat.characters)}
          </div>
        </>
      })}
    </div>
  )
}

export default { ArtifactSetStatistics }
