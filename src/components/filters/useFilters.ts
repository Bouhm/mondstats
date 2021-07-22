import { clone } from 'lodash';
import { useCallback, useState } from 'react';

export type FilterChangeFunc = (name: keyof Filters, value: string | number | boolean) => void

export type Filters = {
  f2p: boolean,
  max5: number
}

const useFilters = () => {
  const [filters, setFilters] = useState<Filters>({ f2p: false, max5: 0 })

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

export default useFilters;