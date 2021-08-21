import './StatsTable.scss';

import { capitalize, isEmpty, map, reduce } from 'lodash';
import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { ICharacterData } from '../../data/types';
import { getArtifactSetNames, getCharacterFileName, getPercentage, shortenId } from '../../scripts/util';
import ArtifactSets from '../artifact-sets/ArtifactSets';
import { useAppSelector } from '../hooks/useRedux';
import Tooltip from '../ui/Tooltip';
import Pagination from '../ui/Pagination';
import usePaginate from '../hooks/usePaginate';
import { useEffect } from 'react';

function renderCharacterStats(character: ICharacterData, count: number, key: string) {
  return (
    <Tooltip key={key} content={`${character.name}: ${count}`}>
      <img key={key} className={`character-stats rarity-${character.rarity}`} src={`/assets/characters/${getCharacterFileName(character)}.webp`} alt={character.name} />
    </Tooltip>
  )
}

function ArtifactSetStatistics({data}: any) {
  const db = useAppSelector((state) => state.data.artifactSetDb)
  const title = 'artifacts'
  const renderCard = (itemStat: any) => (
    <Tooltip content={getArtifactSetNames(itemStat.artifacts, db)}>
      <div className="row-card col">
        <ArtifactSets artifacts={itemStat.artifacts} />
      </div>
    </Tooltip>
  )

  return <StatsTable data={data} title={title} renderCard={renderCard} />
}

function WeaponStatistics({data}: any) {
  const db = useAppSelector((state) => state.data.weaponDb)
  const title = 'weapons'
  const renderCard = (itemStat: any) => (
    <Tooltip content={`${db[itemStat._id].name}`}>
      <div className="row-card col">
        <img src={`/assets/${title}/${shortenId(itemStat._id)}.webp`} />
      </div>
    </Tooltip>
  )

  return <StatsTable data={data} title={title} renderCard={renderCard} />
}

type StatsTableProps = {
  data: any,
  title: string,
  renderCard: (itemStat: any) => JSX.Element
} 

function StatsTable({ data, title, renderCard }: StatsTableProps) {
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const total = reduce(data, (sum: number, curr: any) => sum + curr.count, 0)
  const pageSize = 20;
  const { currentPage, onPageChange, handleReset, filterPageContent } = usePaginate(pageSize);

  useEffect(() => {
    handleReset()
  }, [data])

  return (
    <div className="stats-table-container">
      <div className="stats-table">
        <div className="stats-table-row">
            <div className="row-card">
              <span className="col-header">{capitalize(title)}</span>
            </div>
            <div className="row-stats">
            <span className="col-header">Usage %</span>
            </div>
            <div className="row-related">
            <span className="col-header">Used by</span>
            </div>
        </div>
        {map(filterPageContent(data), (itemStat: any, i) => {
          const percentage = getPercentage(itemStat.count, total);

          return (
            <div key={`row-${i}`} className="stats-table-row">
              {renderCard(itemStat)}
              <Tooltip className={'row-stats col'} content={`Count: ${itemStat.count}`}>
                <>
                  <div
                    className={`row-stats-bar`} 
                    style={{ width: `${percentage}%`}} 
                  />    
                  <div className="row-stats-pct">{ `${percentage}%`}</div>
                </>
              </Tooltip>
              <ScrollContainer vertical={false} className="row-related col">
                {map(itemStat.characters, (charStat, j) => renderCharacterStats(characterDb[charStat._id], charStat.count, `${charStat._id}-${i}-${j}`))}
              </ScrollContainer>
            </div>
          )
        })}
      </div>
      {data.length > pageSize && <Pagination current={currentPage} pageSize={pageSize} onChange={onPageChange} total={data.length} />}
    </div>
  )
}


export default { ArtifactSetStatistics, WeaponStatistics }
