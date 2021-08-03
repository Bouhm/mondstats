import './StatsTable.scss';

import { keys, map, orderBy, reduce, take } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-use-gesture';

import { ICharacterData } from '../../data/types';
import { getCharacterFileName } from '../../scripts/util';
import ArtifactSets from '../artifact-sets/ArtifactSets';
import useApi from '../hooks/useApi';
import { useAppSelector } from '../hooks/useRedux';

function renderCharacterStats(character: ICharacterData, count: number) {
  return (
    <img className={`character-stats rarity-${character.rarity}`} src={`/assets/characters/${getCharacterFileName(character)}.webp`} alt={character.name} />
  )
}

function ArtifactSetStatistics() {
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const artifactSetStats = useApi(`/artifacts/top-artifactsets.json`)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const total = reduce(artifactSetStats, (sum: number, curr: any) => sum + curr.count, 0)
  const bind = useDrag(state => state)

  if (!artifactSetStats || !artifactSetDb) return null;
  return (
    <div className="stats-table">
      {map(take(artifactSetStats, 10), (itemStat: any, i) => {
        return (
          <div key={`row-${i}`} className="stats-table-row">
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
            <div className="row-related" {...bind}>
              {map(keys(itemStat.characters), charId => renderCharacterStats(characterDb[charId], itemStat.characters[charId]))}
            </div>
        </div>
      )})}
    </div>
  )
}

export default { ArtifactSetStatistics }
