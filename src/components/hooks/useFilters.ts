import { clone, forEach } from 'lodash';
import { createElement, useState } from 'react';

export type FilterChangeFunc = (name: string, value: number | boolean) => void

export type FilterType = {
  label: JSX.Element
  value: boolean
}

export type FiltersType = {
  [key: string]: FilterType
} & { max5?: { value: number }}

const useFilters = (filterKeys: string[]) => {
  let defaultFilters: FiltersType = {}
  forEach(filterKeys, key => {
    switch (key) {
      case 'max5':
        defaultFilters[key] = { value: 4 };
        break;
      case 'a6':
        defaultFilters[key] = { label: createElement('div',{},'Lvl80+'), value: false };
        break;
      // case 'elements':
      //   forEach(CharacterElements, element => {
      //     defaultFilters[element.toLowerCase()] = {

      //     }
      //   })
      //   break;
      // case 'weapons':
      //   forEach(WeaponTypes, weapon => {
      //     defaultFilters[weapon.toLowerCase()] = {

      //     }
      //   })
      //   break;
      default:
        defaultFilters[key] = { label: createElement('div',{},key.toUpperCase()), value: false }
        break;
    }
  })

  const [filters, setFilters] = useState<FiltersType>(defaultFilters)

  const handleFilterChange = (name: string, value: string | number | boolean) => {
    let updatedFilters = clone(filters) as any;
    updatedFilters[name].value = value;
    setFilters(updatedFilters)
  }

  return {
    filters,
    handleFilterChange
  }
}

export default useFilters;