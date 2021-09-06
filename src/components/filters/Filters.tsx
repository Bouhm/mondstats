import './Filters.scss';

import { clone, flatten, forEach, map, reduce } from 'lodash';
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
    types: [],
    elements: []
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

type FiltersProps = {
  filterKeys: string[]
}

const Filters = ({ filterKeys }: FiltersProps) => {
  const labels = reduce(filterKeys, (arr: string[], curr) => {
    switch (curr) {
      case 'a6':
        return [...arr, 'Lv80+']
      case 'types':
        return [...arr, ...WeaponTypes]
      case 'elements':
        return [...arr, ...CharacterElements]
      default:
        return arr
    }
  }, [])

  const { activeTabIdx, onTabChange } = useTabs();
  const { filters, handleFilterChange } = useFilters(filterKeys)

  console.log(labels)
  return (
    <div className="filters-container">
      <Tabs tabs={labels} activeTabIdx={activeTabIdx} onChange={onTabChange} />
      <Divider />
      <F2P onChange={handleFilterChange} f2p={!!filters.f2p} max5={filters.max5!} />
    </div>
  )
}

export default Filters;