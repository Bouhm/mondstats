import './StatsTable.scss';

import { capitalize, isEmpty, map, reduce } from 'lodash';
import React from 'react';

import { ICharacterData } from '../../data/types';
import { getCharacterFileName } from '../../scripts/util';
import { useAppSelector } from '../hooks/useRedux';
import ScrollContainer from 'react-indiana-drag-scroll';
import { usePopperTooltip } from 'react-popper-tooltip';
import ArtifactSets from '../artifact-sets/ArtifactSets';

type StatsTableProps = {
  data: any,
  title: string
}

function renderCharacterStats(character: ICharacterData, count: number, key: string) {
  return (
    <img key={key} className={`character-stats rarity-${character.rarity}`} src={`/assets/characters/${getCharacterFileName(character)}.webp`} alt={character.name} />
  )
}

function ArtifactSetStatistics({data}: any) {
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const total = reduce(data, (sum: number, curr: any) => sum + curr.count, 0)
  const title = "artifacts";
  const {
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip();

  return (
    <div className="stats-table">
      <div className="stats-table-row">
          <div className="row-card">
            <span>{capitalize(title)}</span>
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
            <div className='row-card col'>
              <ArtifactSets artifacts={itemStat.artifacts} />
            </div>
            <div ref={setTriggerRef} className='row-stats col'>
              <div
                className={`row-stats-bar`} 
                style={{ width: `${Math.round((itemStat.count / total * 1000)/10)}%`}} 
              />    
              <div className="row-stats-pct">{ `${Math.round((itemStat.count / total * 1000)/10)}%`}</div>
              {visible && 
                <div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container' })}>
                  {itemStat.count}
                </div>
              }
            </div>
            <ScrollContainer vertical={false} className="row-related col">
              {map(itemStat.characters, (charStat, j) => renderCharacterStats(characterDb[charStat._id], charStat.count, `${charStat._id}-${i}-${j}`))}
            </ScrollContainer>
        </div>
      )})}
    </div>
  )
}


function WeaponStatistics({data}: any) {
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const total = reduce(data, (sum: number, curr: any) => sum + curr.count, 0)
  const title = 'weapons';
  const {
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip();

  return (
    <div className="stats-table">
      <div className="stats-table-row">
          <div className="row-card">
            <span>{capitalize(title)}</span>
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
            <div className='row-card col'>
              
            </div>
            <div ref={setTriggerRef} className='row-stats col'>
              <div
                className={`row-stats-bar`} 
                style={{ width: `${Math.round((itemStat.count / total * 1000)/10)}%`}} 
              />    
              <div className="row-stats-pct">{ `${Math.round((itemStat.count / total * 1000)/10)}%`}</div>
              {visible && 
                <div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container' })}>
                  {itemStat.count}
                </div>
              }
            </div>
            <ScrollContainer vertical={false} className="row-related col">
              {map(itemStat.characters, (charStat, j) => renderCharacterStats(characterDb[charStat._id], charStat.count, `${charStat._id}-${i}-${j}`))}
            </ScrollContainer>
        </div>
      )})}
    </div>
  )
}


export default { ArtifactSetStatistics, WeaponStatistics }
