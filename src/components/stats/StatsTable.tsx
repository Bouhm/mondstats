import './StatsTable.scss';

import { capitalize, filter, map, orderBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { StringParam, useQueryParams, withDefault } from 'use-query-params';

import { getArtifactSetBuildAbbreviation, getArtifactSetNames, getPercentage } from '../../scripts/util';
import ArtifactSetBuildCard from '../artifactSets/ArtifactSetBuildCard';
import { useAppSelector } from '../hooks/useRedux';
import { useTabs } from '../hooks/useTabs';
import { CaretDown, CaretUp } from '../ui/Icons';
import LLImage from '../ui/LLImage';
import Tabs from '../ui/Tabs';
import Tooltip from '../ui/Tooltip';

function Characters({data, isPreview }: any) {
  const db = useAppSelector((state) => state.data.characterDb)
  const title = 'characters'

  // Total number of players before the whole hoyolab API changing and making everything obsolete
  const getTotal = () => 57824
  
  const getAbyssTotal = () => data.totals.abyssTotal
  
  // const getColorClass = (item: any) => db[item._id].element
  const getColorClass = (item: any) => 'Green'

  const renderImage = (item: any) => (
    <Tooltip className='stats-character-portrait' content={db[item._id].name}>
      <>
        <LLImage src={`/assets/${title}/${item._id}.webp`} />
        <LLImage className='stats-character-element' src={`/assets/elements/${db[item._id].element}.webp`} />
      </>
    </Tooltip>
  )

  return <StatsTable data={data} title={title} getTotal={getTotal} getAbyssTotal={getAbyssTotal} getColorClass={getColorClass} renderImage={renderImage} isPreview={isPreview} />
}

function ArtifactSetBuilds({data, isPreview }: any) {
  const db = useAppSelector((state) => state.data.artifactSetBuildDb)
  const setDb = useAppSelector((state) => state.data.artifactSetDb)
  const title = 'artifact sets'

  const getTotal = () => data.totals.total
  
  const getAbyssTotal = () => data.totals.abyssTotal

  const renderImage = (item: any) => {
    return <Tooltip content={getArtifactSetNames(db[item._id].sets, setDb)}><ArtifactSetBuildCard id={item._id} /></Tooltip>
  }

  const getColorClass = (item: any) => 'Artifacts'

  return <StatsTable data={data} title={title} field='artifactSetBuilds' getTotal={getTotal} getAbyssTotal={getAbyssTotal} getColorClass={getColorClass} renderImage={renderImage} isPreview={isPreview} />
}

function Weapons({data, isPreview }: any) {
  const db = useAppSelector((state) => state.data.weaponDb)
  const title = 'weapons'
  const tabs = isPreview ? [] : ['Sword', 'Claymore', 'Catalyst', 'Bow', 'Polearm'];

  const getTotal = (item: any) => data.totals[db[item._id].type_name].typeTotal
  
  const getAbyssTotal = (item: any) => data.totals[db[item._id].type_name].abyssTypeTotal

  const getColorClass = (item: any) => db[item._id].type_name

  const renderImage = (item: any) => <Tooltip content={db[item._id].name}><LLImage src={`/assets/${title}/${item._id}.webp`} /></Tooltip>

  const dataFilter = (data: any, match: string) => filter(data, item => db[item._id].type_name === match);

  return <StatsTable 
    data={data} 
    dataFilter={dataFilter}
    title={title} 
    getTotal={getTotal} 
    getAbyssTotal={getAbyssTotal} 
    getColorClass={getColorClass} 
    tabs={tabs} 
    renderImage={renderImage} 
    isPreview={isPreview}
  />
}

type StatsTableProps = {
  isPreview?: boolean,
  data: any,
  title: string,
  field?: string,
  tabs?: string[],
  getTotal: (item?: any) => number,
  getAbyssTotal: (item?: any) => number,
  getColorClass?: (item?: any) => string,
  dataFilter?: (data: any, match: string) => any,
  renderImage: (item: any) => JSX.Element
} 

function StatsTable({ data, isPreview = false, title, field = title, tabs = [], getTotal, getAbyssTotal, getColorClass, dataFilter, renderImage }: StatsTableProps) {
  
  const columns = ['all', 'abyss']
  const [orderDir, setOrderDir] = useState('desc');

  const [query, setQuery] = useQueryParams({
    type: withDefault(StringParam, tabs[0] || ''),
    columnOrder: withDefault(StringParam, columns[0])
  });
  const { activeTabIdx, onTabChange } = useTabs(query ? (tabs.indexOf(capitalize(query.type)) | 0) : 0);

  let defaultData = dataFilter ? dataFilter(data[field], tabs[activeTabIdx]) : data[field];

  const [orderedData, setOrderedData] = useState(defaultData);
  useEffect(() => {
    let filteredData = dataFilter ? dataFilter(data[field], tabs[activeTabIdx]) : data[field];

    if (!isPreview) {
      if (query.columnOrder && query.columnOrder === columns[1]) {
        setOrderedData(orderBy(filteredData, 'abyssCount', 'desc'))
      } else {
        setOrderedData(orderBy(filteredData, 'count', 'desc'))
      }
    } else {
      setOrderedData(orderBy(data[field], 'abyssCount', 'desc').slice(0, 5))
    }
  }, [query.columnOrder, dataFilter, activeTabIdx, isPreview])

  const handleTabChange = (i: number) => {
    if (!!tabs.length) {
      setQuery({ type: tabs[i].toLowerCase() })
      onTabChange(i);
    }
  }

  const handleColOrderChange = (col: string) => {
    if (col === 'all') {
      setQuery({ columnOrder: undefined }, 'pushIn');
    } else {
      setQuery({ columnOrder: col }, 'pushIn');
    }
  }

  const renderCaret = (col: string) => {
    if (orderDir === 'desc') {
      return <span className={`orderToggle ${col === query.columnOrder ? 'asActive' : ''}`}><CaretDown color={'black'} /></span>
    } else {
      return <span className={`orderToggle ${col === query.columnOrder ? 'asActive' : ''}`}><CaretUp /></span>
    }
  }

  return (
    <div className='stats-table-container'>
      {!!tabs.length && <Tabs tabs={map(tabs, tab => <img src={`/assets/icons/${tab}.webp`} />)} activeTabIdx={activeTabIdx} onChange={handleTabChange} />}
      <div className={`stats-table ${isPreview ? 'asPreview' : ''}`}>
        <table>
          {!isPreview && 
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">{title.slice(0, title.length-1)}</th>
                <th scope="col" onClick={() => handleColOrderChange(columns[0])}>Overall Usage {renderCaret(columns[0])}</th>
                <th scope="col" onClick={() => handleColOrderChange(columns[1])}>Abyss Usage {renderCaret(columns[1])}</th>
              </tr>
            </thead>
          }
          <tbody>
            {map(orderedData, (item, i) => {
              const total = getPercentage(item.count, getTotal(item));
              const abyssTotal = getPercentage(item.abyssCount, getAbyssTotal(item));

              return (
                <tr key={`${title}-${i}`}>
                  <td>{i + 1}</td>
                  <td className='stats-image'>{renderImage(item)}</td>
                  {!isPreview && 
                  <td>
                    <Tooltip className='stats-row-percentage' content={`Count: ${item.count}`}>
                      <>
                        <div
                          className={`stats-row-bar ${getColorClass && getColorClass(item)}`} 
                          style={{ width: `${total}%`}} 
                        />    
                        <div className="stats-row-value">{ `${total}%`}</div>
                      </>
                    </Tooltip>
                  </td>
                  }
                  <td>
                    <Tooltip className='stats-row-percentage' content={`Abyss Count: ${item.abyssCount}`}>
                      <>
                        <div
                            className={`stats-row-bar ${getColorClass && getColorClass(item)}`} 
                            style={{ width: `${abyssTotal}%`}} 
                        />    
                        <div className="stats-row-value">{ `${abyssTotal}%`}</div>
                      </>
                    </Tooltip>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default { ArtifactSetBuilds, Weapons, Characters }