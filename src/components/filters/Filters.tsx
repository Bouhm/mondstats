import './Filters.scss';

import { includes, keys, map, omit } from 'lodash';
import React, { useState } from 'react';

import { FiltersType } from '../hooks/useFilters';
import Divider from '../ui/Divider';
import FiveStarFilter from './FiveStarFilter';

type FilterTabProps = {
  isActive: boolean,
  label: JSX.Element,
  color?: string
}

const FilterButton = ({isActive = false, label, color=''}: FilterTabProps) => {
  return <div className={`filter-button ${isActive ? 'asActive' : ''}`} style={isActive ? {backgroundColor: color }:{}}>
    {label}
  </div>
}

type FiltersProps = {
  filters: FiltersType,
  onFilterChange: (name: string, value: number | boolean) => void,
  color?: string
}

const Filters = ({ filters, onFilterChange, color='' }: FiltersProps) => {
  const handleFilterChange = (name: string, value: number | boolean) => {
    onFilterChange(name, value);
  }

  return (
    <div className="filters-container">
      {/* <div className="filters-label">Filters</div> */}
      {
        includes(keys(filters), 'max5') && 
        <>
          <FiveStarFilter onChange={handleFilterChange} max5={filters.max5!.value} />
          <Divider />
        </>
      }
      <div className="filter-options">
        {map(Object.entries(omit(filters, 'max5')), ([key, filter])=> <div key={`${key}`} onClick={() => handleFilterChange(key, !filter.value)}><FilterButton color={color} label={filter.label} isActive={filter.value} /></div>)}
      </div>
    </div>
  )
}

export default Filters;