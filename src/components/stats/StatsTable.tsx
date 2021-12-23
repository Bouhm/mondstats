import './StatsTable.scss';

import { capitalize, filter, isEmpty, map, reduce } from 'lodash';
import React, { useEffect } from 'react';

import { getPercentage } from '../../scripts/util';
import ArtifactSetBuildCard from '../artifact-sets/ArtifactSetBuildCard';
import { useAppSelector } from '../hooks/useRedux';
import { useTabs } from '../hooks/useTabs';
import LLImage from '../ui/LLImage';
import Tabs from '../ui/Tabs';

function Characters({data}: any) {
  const db = useAppSelector((state) => state.data.characterDb)
  const title = 'characters'

  const getTotal = () => data.totals.total
  
  const getAbyssTotal = () => data.totals.abyssTotal
  
  // const getColorClass = (item: any) => db[item._id].element
  const getColorClass = (item: any) => 'Green'

  const renderImage = (item: any) => (
    <div className='stats-character-portrait'>
      <LLImage src={`/assets/${title}/${item._id}.webp`} />
      <LLImage className='stats-character-element' src={`/assets/elements/${db[item._id].element}.webp`} />
    </div>
  )

  return <StatsTable data={data} title={title} getTotal={getTotal} getAbyssTotal={getAbyssTotal} getColorClass={getColorClass} renderImage={renderImage} />
}

function ArtifactSetBuilds({data}: any) {
  const db = useAppSelector((state) => state.data.artifactSetBuildDb)
  const title = 'artifact sets'

  const getTotal = () => data.totals.total
  
  const getAbyssTotal = () => data.totals.abyssTotal

  const renderImage = (item: any) => <ArtifactSetBuildCard id={item._id} />

  const getColorClass = (item: any) => 'Red'

  return <StatsTable data={data} title={title} field='artifactSetBuilds' getTotal={getTotal} getAbyssTotal={getAbyssTotal} getColorClass={getColorClass} renderImage={renderImage} />
}

function Weapons({data}: any) {
  const db = useAppSelector((state) => state.data.weaponDb)
  const title = 'weapons'

  const getTotal = (item: any) => data.totals[db[item._id].type_name].typeTotal
  
  const getAbyssTotal = (item: any) => data.totals[db[item._id].type_name].abyssTypeTotal

  const getColorClass = (item: any) => db[item._id].type_name

  const renderImage = (item: any) => <LLImage src={`/assets/${title}/${item._id}.webp`} />

  const dataFilter = (data: any, match: string) => filter(data, item => db[item._id].type_name === match)

  return <StatsTable 
    data={data} 
    dataFilter={dataFilter}
    title={title} 
    getTotal={getTotal} 
    getAbyssTotal={getAbyssTotal} 
    getColorClass={getColorClass} 
    tabs={['Sword', 'Claymore', 'Catalyst', 'Bow', 'Polearm']} 
    renderImage={renderImage} 
  />
}

type StatsTableProps = {
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

function StatsTable({ data, title, field = title, tabs = [], getTotal, getAbyssTotal, getColorClass, dataFilter, renderImage }: StatsTableProps) {
  const { activeTabIdx, onTabChange } = useTabs();
  const filteredData = dataFilter ? dataFilter(data[field], tabs[activeTabIdx]) : data[field];

  return (
    <div className='stats-table-container'>
      {!!tabs.length && <Tabs tabs={tabs} activeTabIdx={activeTabIdx} onChange={onTabChange} />}
      <table className='stats-table'>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{title.slice(0, title.length-1)}</th>
            <th scope="col">Overall Usage</th>
            <th scope="col">Abyss Usage</th>
          </tr>
        </thead>
      <tbody>
        {map(filteredData, (item, i) => {
          const total = getPercentage(item.count, getTotal(item));
          const abyssTotal = getPercentage(item.abyssCount, getAbyssTotal(item));

          return (
            <tr key={`${title}-${i}`}>
              <td>{i + 1}</td>
              <td className='stats-image'>{renderImage(item)}</td>
              <td>
                <div className='stats-row-percentage'>
                  <div
                    className={`stats-row-bar ${getColorClass && getColorClass(item)}`} 
                    style={{ width: `${total}%`}} 
                  />    
                  <div className="stats-row-value">{ `${total}%`}</div>
                </div>
              </td>
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