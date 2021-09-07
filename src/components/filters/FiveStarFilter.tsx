import './FiveStarFilter.scss';

import { indexOf } from 'lodash';
import React from 'react';

import Elevator from '../controls/Elevator';
import { FilterChangeFunc } from '../hooks/useFilters';

type ToggleProps = {
  onChange: FilterChangeFunc,
  max5: number
}

function FiveStarFilter({ onChange, max5 }: ToggleProps) {
  const values = [0,1,2,3,4];
  
  const handleIndexChange = (index: number) => {
    onChange('max5', values[index])
  }

  return (
    <div className="five-star-filter">
      <Elevator label={"MAX 5★"} onIndexChange={handleIndexChange} index={indexOf(values, max5)} values={values} />
    </div>
  )
}

export default FiveStarFilter