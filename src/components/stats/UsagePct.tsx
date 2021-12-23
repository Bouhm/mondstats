import './UsagePct.scss';

import React from 'react';

import { getPercentage } from '../../scripts/util';

type UsagePctProps = {
  total: number,
  count: number,
  size?: string
}

function UsagePct({ total, count, size='' }: UsagePctProps) {
  return (
    <div className={`usage-pct ${size}`}>
      <div className='usage-pct-value'>{`${getPercentage(count, total)}%`}</div>
      <div className='usage-pct-count'>{count}</div>
    </div>
  )
}

export default UsagePct;