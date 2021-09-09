import './StatsTable.scss';

import { capitalize, isEmpty, map, reduce } from 'lodash';
import React, { useEffect } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { ICharacterData } from '../../data/types';
import {
  getArtifactSetNames,
  getCharacterFileName,
  getCharacterLabel,
  getPercentage,
  shortenId,
} from '../../scripts/util';
import ArtifactSetBuild from '../artifact-sets/ArtifactSetBuild';
import CharacterCount from '../characters/CharacterCount';
import Pagination from '../controls/Pagination';
import useApi from '../hooks/useApi';
import usePaginate from '../hooks/usePaginate';
import { useAppSelector } from '../hooks/useRedux';
import LLImage from '../ui/LLImage';
import Loader from '../ui/Loader';
import Tooltip from '../ui/Tooltip';

function Characters({data}: any) {
  const db = useAppSelector((state) => state.data.characterDb)
  const featured = useApi(`/featured.json`);
  const pageSize = 20;
  const { currentPage, onPageChange, handleReset, filterPageContent } = usePaginate(pageSize);

  useEffect(() => {
    handleReset()
  }, [data])

  const title = 'characters'
  const renderCard = (itemStat: any) => {
    const name = getCharacterLabel(db[itemStat._id]);
    return <Tooltip content={name}>
      <div className="row-card col">
        {/* <LLImage className="row-card-element" src={`/assets/elements/${db[itemStat._id].element}.webp`} /> */}
        <LLImage src={`/assets/${title}/${getCharacterFileName(db[itemStat._id])}.webp`} />
      </div>
    </Tooltip>
  }

  if (!featured) return <Loader />

  return (
    <div className='stats-table-container'>
      <div className={`stats-table ${title}-stats`}>
        <div className="stats-table-row">
            <div className="row-card">
              <span className="col-header">{capitalize(title)}</span>
            </div>
            <div className="row-stats">
            <span className="col-header" title="*Players who own and have fully built the character">Usage %</span>
            </div>
            <div className="row-stats">
            <span className="col-header" title="*Pick rates in the Spiral Abyss">Pick Rate %</span>
            </div>
        </div>
        {map(filterPageContent(data), (itemStat: any, i) => {
          const ownedPercentage = getPercentage(itemStat.total, featured.player_total);
          const pickedPercentage = getPercentage(itemStat.abyssCount, featured.abyss_total);

          return (
            <div key={`row-${i}`} className="stats-table-row">
              {renderCard(itemStat)}
              <Tooltip className={'row-stats col'} content={`Count: ${itemStat.total}`}>
                <>
                  <div
                    className={`row-stats-bar`} 
                    style={{ width: `${ownedPercentage}%`}} 
                  />    
                  <div className="row-stats-pct">{ `${ownedPercentage}%`}</div>
                </>
              </Tooltip>
              <Tooltip className={'row-stats col'} content={`Count: ${itemStat.abyssCount || 0}`}>
                <>
                  <div
                    className={`row-stats-bar`} 
                    style={{ width: `${pickedPercentage}%`}} 
                  />    
                  <div className="row-stats-pct">{ `${pickedPercentage}%`}</div>
                </>
              </Tooltip>
            </div>
          )
        })}
      </div>
      {data.length > pageSize && <Pagination current={currentPage} pageSize={pageSize} onChange={onPageChange} total={data.length} />}
    </div>
  )
}

function ArtifactSets({data}: any) {
  const db = useAppSelector((state) => state.data.artifactSetDb)
  const title = 'artifacts'
  const renderCard = (itemStat: any) => (
    <Tooltip content={getArtifactSetNames(itemStat.artifacts, db)}>
      <div className="row-card col">
        <ArtifactSetBuild artifacts={itemStat.artifacts} />
      </div>
    </Tooltip>
  )

  return <ItemStatsTable data={data} title={title} renderCard={renderCard} />
}

function Weapons({data}: any) {
  const db = useAppSelector((state) => state.data.weaponDb)
  const title = 'weapons'
  const renderCard = (itemStat: any) => (
    <Tooltip content={`${db[itemStat._id].name}`}>
      <div className="row-card col">
        <LLImage src={`/assets/${title}/${shortenId(itemStat._id)}.webp`} />
      </div>
    </Tooltip>
  )

  return <ItemStatsTable data={data} title={title} renderCard={renderCard} />
}

type StatsTableProps = {
  data: any,
  title: string,
  renderCard: (itemStat: any) => JSX.Element
} 

function ItemStatsTable({ data, title, renderCard }: StatsTableProps) {
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const total = reduce(data, (sum: number, curr: any) => sum + curr.count, 0)
  const pageSize = 20;
  const { currentPage, onPageChange, handleReset, filterPageContent } = usePaginate(pageSize);

  useEffect(() => {
    handleReset()
  }, [data])

  return (
    <div className='stats-table-container'>
      <div className={`stats-table ${title}-stats`}>
        <div className="stats-table-row asItems">
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
            <div key={`row-${i}`} className="stats-table-row asItems">
              {renderCard(itemStat)}
              <Tooltip className={'row-stats col'} content={`Count: ${itemStat.count}`}>
                <>
                  <div
                    className={`row-stats-bar`} 
                    style={{ width: `${percentage}%`, backgroundColor: ''}} 
                  />    
                  <div className="row-stats-pct">{ `${percentage}%`}</div>
                </>
              </Tooltip>
              <ScrollContainer vertical={false} className="row-related col">
                {map(itemStat.characters, (charStat, j) => <CharacterCount character={characterDb[charStat._id]} count={charStat.count} key={`${charStat._id}-${i}-${j}`}/>)}
              </ScrollContainer>
            </div>
          )
        })}
      </div>
      {data.length > pageSize && <Pagination current={currentPage} pageSize={pageSize} onChange={onPageChange} total={data.length} />}
    </div>
  )
}


export default { ArtifactSets, Weapons, Characters }