import './UsagePct.scss';

import React from 'react';

import { getPercentage } from '../../scripts/util';

type UsagePctProps = {
  total: number,
  count: number,
}

function UsagePct({ total, count }: UsagePctProps) {
  return (
    <div className={`usage-pct`}>
      <div className='usage-pct-value'>{`${getPercentage(count, total)}%`}</div>
      <div className='usage-pct-count'>{count}</div>
    </div>
  )
}

export default UsagePct;