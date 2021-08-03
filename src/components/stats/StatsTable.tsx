import './StatsTable.scss';

import { clone, filter, includes, intersection, keys, map, orderBy, reduce, take } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

import { ICharacterData } from '../../data/types';
import { getCharacterFileName } from '../../scripts/util';
import ArtifactSets from '../artifact-sets/ArtifactSets';
import useApi from '../hooks/useApi';
import { useAppSelector } from '../hooks/useRedux';

function renderCharacterStats(character: ICharacterData, count: number, key: string) {
  return (
    <img key={key} className={`character-stats rarity-${character.rarity}`} src={`/assets/characters/${getCharacterFileName(character)}.webp`} alt={character.name} />
  )
}

function ArtifactSetStatistics(props: any) {
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  let artifactSetStats = useApi(`/artifacts/top-artifactsets.json`)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const total = reduce(artifactSetStats, (sum: number, curr: any) => sum + curr.count, 0)
  const maxChars = 8;
  
  if (!artifactSetStats || !artifactSetDb) return null;

  artifactSetStats = props.selected.length ? filter(artifactSetStats, (set: any) => intersection(props.selected, set.artifacts).length) : artifactSetStats;
  console.log(artifactSetStats)

  return (
    <div className="stats-table">
      <div className="stats-table-row">
          <div className="row-card">
            <span>Artifact Sets</span>
          </div>
          <div className="row-stats">
          <span>Usage %</span>
          </div>
          <div className="row-related">
          <span>Used by</span>
          </div>
      </div>
      {map(take(artifactSetStats, 10), (itemStat: any, i) => {
        return (
          <div key={`row-${i}`} className="stats-table-row">
            <div className="row-card col">
              <ArtifactSets artifacts={itemStat.artifacts} color={'red'} />
            </div>
            <div className="row-stats col">
              <div
                className={`row-stats-bar`} 
                style={{ width: `${Math.round((itemStat.count / total * 1000)/10)}%`}} 
              />
              <div className="row-stats-pct">{ `${Math.round((itemStat.count / total * 1000)/10)}%`}</div>
            </div>
            <div className="row-related col">
              {map(take(keys(itemStat.characters), maxChars), (charId, j) => renderCharacterStats(characterDb[charId], itemStat.characters[charId], `${charId}-${i}-${j}`))}
            </div>
        </div>
      )})}
    </div>
  )
}

export default { ArtifactSetStatistics }
