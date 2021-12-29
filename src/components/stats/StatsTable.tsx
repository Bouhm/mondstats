import './StatsTable.scss';

import { capitalize, filter, map, orderBy } from 'lodash';
import React from 'react';

// import { StringParam, useQueryParams, withDefault } from 'use-query-params';
import { getPercentage } from '../../scripts/util';
import ArtifactSetBuildCard from '../artifactSets/ArtifactSetBuildCard';
import { useAppSelector } from '../hooks/useRedux';
import { useTabs } from '../hooks/useTabs';
import LLImage from '../ui/LLImage';
import Tabs from '../ui/Tabs';

function Characters({data, isPreview }: any) {
  const db = useAppSelector((state) => state.data.characterDb)
  const title = 'characters'

  // Total number of players before the whole hoyolab API changing and making everything obsolete
  const getTotal = () => 57824
  
  const getAbyssTotal = () => data.totals.abyssTotal
  
  // const getColorClass = (item: any) => db[item._id].element
  const getColorClass = (item: any) => 'Green'

  const renderImage = (item: any) => (
    <div className='stats-character-portrait'>
      <LLImage src={`/assets/${title}/${item._id}.webp`} />
      <LLImage className='stats-character-element' src={`/assets/elements/${db[item._id].element}.webp`} />
    </div>
  )

  return <StatsTable data={data} title={title} getTotal={getTotal} getAbyssTotal={getAbyssTotal} getColorClass={getColorClass} renderImage={renderImage} isPreview={isPreview} />
}

function ArtifactSetBuilds({data, isPreview }: any) {
  const db = useAppSelector((state) => state.data.artifactSetBuildDb)
  const title = 'artifact sets'

  const getTotal = () => data.totals.total
  
  const getAbyssTotal = () => data.totals.abyssTotal

  const renderImage = (item: any) => <ArtifactSetBuildCard id={item._id} />

  const getColorClass = (item: any) => 'Red'

  return <StatsTable data={data} title={title} field='artifactSetBuilds' getTotal={getTotal} getAbyssTotal={getAbyssTotal} getColorClass={getColorClass} renderImage={renderImage} isPreview={isPreview} />
}

function Weapons({data, isPreview }: any) {
  const db = useAppSelector((state) => state.data.weaponDb)
  const title = 'weapons'
  const tabs = isPreview ? [] : ['Sword', 'Claymore', 'Catalyst', 'Bow', 'Polearm'];

  const getTotal = (item: any) => data.totals[db[item._id].type_name].typeTotal
  
  const getAbyssTotal = (item: any) => data.totals[db[item._id].type_name].abyssTypeTotal

  const getColorClass = (item: any) => db[item._id].type_name

  const renderImage = (item: any) => <LLImage src={`/assets/${title}/${item._id}.webp`} />

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
  // const [query, setQuery] = useQueryParams({
  //   type: withDefault(StringParam, tabs[0] || '')
  // });
  // const { activeTabIdx, onTabChange } = useTabs(query ? (tabs.indexOf(capitalize(query.type)) | 0) : 0);
  const { activeTabIdx, onTabChange } = useTabs(0);

  let filteredData = dataFilter ? dataFilter(data[field], tabs[activeTabIdx]) : data[field];
  if (isPreview) filteredData = orderBy(data[field], 'abyssCount', 'desc').slice(0, 5);

  const handleTabChange = (i: number) => {
    if (!!tabs.length) {
      // setQuery({ type: tabs[i].toLowerCase() })
      onTabChange(i);
    }
  }

  return (
    <div className='stats-table-container'>
      {!!tabs.length && <Tabs tabs={map(tabs, tab => <img src={`/assets/icons/${tab}.webp`} />)} activeTabIdx={activeTabIdx} onChange={handleTabChange} />}
      <table className='stats-table'>
        {!isPreview && 
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{title.slice(0, title.length-1)}</th>
            <th scope="col">Overall Usage</th>
            <th scope="col">Abyss Usage</th>
          </tr>
        </thead>
        }
      <tbody>
        {map(filteredData, (item, i) => {
          const total = getPercentage(item.count, getTotal(item));
          const abyssTotal = getPercentage(item.abyssCount, getAbyssTotal(item));

          return (
            <tr key={`${title}-${i}`}>
              <td>{i + 1}</td>
              <td className='stats-image'>{renderImage(item)}</td>
              {!isPreview && 
              <td>
                <div className='stats-row-percentage'>
                  <div
                    className={`stats-row-bar ${getColorClass && getColorClass(item)}`} 
                    style={{ width: `${total}%`}} 
                  />    
                  <div className="stats-row-value">{ `${total}%`}</div>
                </div>
              </td>
              }
              <td>
                <div className='stats-row-percentage'>
                  <div
                      className={`stats-row-bar ${getColorClass && getColorClass(item)}`} 
                      style={{ width: `${abyssTotal}%`}} 
                  />    
                  <div className="stats-row-value">{ `${abyssTotal}%`}</div>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
  )
}

export default { ArtifactSetBuilds, Weapons, Characters }