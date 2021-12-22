import './StatsTable.scss';

import { capitalize, isEmpty, map, reduce } from 'lodash';
import React, { useEffect } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import {
  getArtifactSetNames,
  getCharacterFileName,
  getCharacterLabel,
  getPercentage,
} from '../../scripts/util';
import _ArtifactSets from '../artifact-sets/ArtifactSets';
import CharacterCount from '../characters/CharacterCount';
import Pagination from '../controls/Pagination';
import useApi from '../hooks/useApi';
import usePaginate from '../hooks/usePaginate';
import { useAppSelector } from '../hooks/useRedux';
import LLImage from '../ui/LLImage';
import Loader from '../ui/Loader';
import Tooltip from '../ui/Tooltip';

function Characters({data}: any) {
  const db = useAppSelector((state) => state.data.artifactSetDb)
  const title = 'characters'

  const getTotal = () => (
    data.totals.total
  )
  
  const getAbyssTotal = () => (
    data.totals.abyssTotal
  )

  const renderImage = (item: any) => (
    <LLImage src={`/assets/${title}/${item._id}.webp`} />
  )

  return <StatsTable data={data} title={title} getTotal={getTotal} getAbyssTotal={getAbyssTotal} renderImage={renderImage} />
}

function ArtifactSetBuilds({data}: any) {
  const db = useAppSelector((state) => state.data.artifactSetBuildDb)
  const title = 'artifactsets'

  const getTotal = () => (
    data.totals.total
  )
  
  const getAbyssTotal = () => (
    data.totals.abyssTotal
  )

  const renderImage = (item: any) => (
    <_ArtifactSets artifacts={item.sets} />
  )

  return <StatsTable data={data} title={title} getTotal={getTotal} getAbyssTotal={getAbyssTotal} renderImage={renderImage} />
}

function Weapons({data}: any) {
  const db = useAppSelector((state) => state.data.weaponDb)
  const title = 'weapons'

  const getTotal = (item: any) => (
    data.totals[db[item._id].type_name].total
  )
  
  const getAbyssTotal = (item: any) => (
    data.totals[db[item._id].type_name].abyssTotal
  )

  const renderImage = (item: any) => (
    <LLImage src={`/assets/${title}/${item._id}.webp`} />
  )

  return <StatsTable data={data} title={title} getTotal={getTotal} getAbyssTotal={getAbyssTotal} renderImage={renderImage} />
}

type StatsTableProps = {
  data: any,
  title: string,
  getTotal: (item?: any) => number,
  getAbyssTotal: (item?: any) => number,
  renderImage: (item: any) => JSX.Element
} 

function StatsTable({ data, title, getTotal, getAbyssTotal, renderImage }: StatsTableProps) {
  console.log(data[title].length)

  return (
    <table className='stats-table'>
    <thead>
      <tr>
        <th>#</th>
        <th>{title.slice(0, title.length-1)}</th>
        <th>Overall Usage</th>
        <th>Abyss Usage</th>
      </tr>
    </thead>
    <tbody>
      {map(data[title], (stats, i) => (
        <tr key={`${title}-${i}`}>
          <td>{i + 1}</td>
          <td>{renderImage(stats)}</td>
          <td className='stats-row-percentage'>{getPercentage(stats.count, getTotal(stats))}%</td>
          <td className='stats-row-percentage'>{getPercentage(stats.abyssCount, getAbyssTotal(stats))}%</td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default { ArtifactSetBuilds, Weapons, Characters }