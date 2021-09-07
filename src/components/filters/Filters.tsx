import './Filters.scss';

import { clone, flatten, forEach, includes, indexOf, map, reduce } from 'lodash';
import React, { useCallback, useState } from 'react';

import { CharacterElements, WeaponTypes } from '../../data/constants';
import Divider from '../ui/Divider';
import Tabs, { useTabs } from '../ui/Tabs';
import F2P from './F2P';

export type FilterChangeFunc = (name: keyof Filters, value: string | number | boolean | string[]) => void

export type Filters = {
  f2p?: boolean,
  max5?: number,
  a6?: boolean,
  types?: string[],
  elements?: string[]
}

type FilterMap = { [key: string]: string | number | boolean | string[] }

const useFilters = (filterKeys: string[]) => {
  const defaults: FilterMap = {
    f2p: false,
    max5: 1,
    a6: false,
  }

  let defaultState: FilterMap = {}
  forEach(filterKeys, key => defaultState[key] = defaults[key])

  const [filters, setFilters] = useState<Filters>(defaultState)

  const handleFilterChange = (name: keyof Filters, value: string | number | boolean) => {
    let updatedFilters = clone(filters) as any;
    updatedFilters[name] = value;
    setFilters(updatedFilters)
  }

  return {
    filters,
    handleFilterChange
  }
}

type FilterTabProps = {
  isActive: boolean,
  label: string
}

const FilterButton = ({isActive = false, label}: FilterTabProps) => {
  return <div className={`filter-button ${isActive ? 'asActive' : ''}`}>
    {label}
  </div>
}

type FiltersProps = {
  filterKeys: string[],
  style?: Object
}

const Filters = ({ filterKeys, style={} }: FiltersProps) => {
  const labels = reduce(filterKeys, (arr: string[], curr) => {
    switch (curr) {
      case 'types':
        return [...arr, ...WeaponTypes]
      case 'elements':
        return [...arr, ...CharacterElements]
      case 'a6':
        return [...arr, 'Lv80+']
      default:
        return arr
    }
  }, [])

  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { filters, handleFilterChange } = useFilters(filterKeys)

  const handleClick = (filter: string) => {
    let newFilters = [...activeFilters];

    if (includes(activeFilters, filter)) {
      newFilters.splice(indexOf(activeFilters, filter), 1)
    } else {
      newFilters.push(filter)
    }

    setActiveFilters(newFilters)
  }

  return (
    <div style={style} className="filters-container">
      {/* <div className="filters-label">Filters</div> */}
      <div className="filter-options">
        {map(labels, (label, i) => <div key={`${label}-${i}`} onClick={() => handleClick(label)}><FilterButton label={label} isActive={includes(activeFilters, label)} /></div>)}
      </div>
      <Divider />
      <F2P onChange={handleFilterChange} f2p={!!filters.f2p} max5={filters.max5!} />
    </div>
  )
}

export default Filters;