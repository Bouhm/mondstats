import './StatsTable.scss';

import { clone, isEmpty, keys, map, orderBy, reduce, take } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

import { ICharacterData } from '../../data/types';
import { getCharacterFileName } from '../../scripts/util';
import ArtifactSets from '../artifact-sets/ArtifactSets';
import useApi from '../hooks/useApi';
import { useAppSelector } from '../hooks/useRedux';
import WeaponCard from '../characters/builds/WeaponCard';

function renderCharacterStats(character: ICharacterData, count: number, key: string) {
  return (
    <img key={key} className={`character-stats rarity-${character.rarity}`} src={`/assets/characters/${getCharacterFileName(character)}.webp`} alt={character.name} />
  )
}

function ArtifactSetStatistics({data}: any) {
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const total = reduce(data, (sum: number, curr: any) => sum + curr.count, 0)
  const maxChars = 20;

  if (!data || isEmpty(artifactSetDb)) return null;

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
      {map(data, (itemStat: any, i) => {
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
              {map(itemStat.characters, (charStat, j) => renderCharacterStats(characterDb[charStat._id], charStat.count, `${charStat._id}-${i}-${j}`))}
            </div>
        </div>
      )})}
    </div>
  )
}


function WeaponStatistics({data}: any) {
  const weaponDb = useAppSelector((state) => state.data.weaponDb)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const total = reduce(data, (sum: number, curr: any) => sum + curr.count, 0)
  const maxChars = 20;

  if (!data || isEmpty(weaponDb)) return null;

  return (
    <div className="stats-table">
      <div className="stats-table-row">
          <div className="row-card">
            <span>Weapons</span>
          </div>
          <div className="row-stats">
          <span>Usage %</span>
          </div>
          <div className="row-related">
          <span>Used by</span>
          </div>
      </div>
      {map(data, (itemStat: any, i) => {
        return (
          <div key={`row-${i}`} className="stats-table-row">
            <div className="row-card col">
              <img src={`/assets/weapons/${weaponDb[itemStat._id].oid}.webp`} />
            </div>
            <div className="row-stats col">
              <div
                className={`row-stats-bar`} 
                style={{ width: `${Math.round((itemStat.count / total * 1000)/10)}%`}} 
              />
              <div className="row-stats-pct">{ `${Math.round((itemStat.count / total * 1000)/10)}%`}</div>
            </div>
            <div className="row-related col">
              {map(itemStat.characters, (charStat, j) => renderCharacterStats(characterDb[charStat._id], charStat.count, `${charStat._id}-${i}-${j}`))}
            </div>
        </div>
      )})}
    </div>
  )
}

export default { ArtifactSetStatistics, WeaponStatistics }
