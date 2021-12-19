import React from 'react';
import './UsageStats.scss'
import { getPercentage } from '../../scripts/util';

type UsageStatsProps = {
  rank?: number,
  count: number,
  total: number
  abyssCount: number,
  abyssTotal: number
}

function UsageStats({ count, total, abyssCount, abyssTotal, rank }: UsageStatsProps) {
  return (
    <div className="usage-stats-container">
      {/* <div className="usage-stats">
        <h2 className="usage-stats-title">
          Rank
        </h2>
        <div className="usage-stats-content usage-stats-rank">
          {rank}
        </div>
      </div> */}
      <div className="usage-stats">
        <h2 className="usage-stats-title">
          Overall Usage
        </h2>
        <div className="usage-stats-content usage-stats-pct">
          {getPercentage(count, total)}%
        </div>
      </div>
      <div className="usage-stats-abyss">
        <div className="usage-stats">
          <h2 className="usage-stats-title">
            Abyss Usage
          </h2>
          <div className="usage-stats-content usage-stats-abyss-pct">
            {getPercentage(abyssCount, abyssTotal) }%
          </div>
        </div>
      </div>
    </div> 
  )
}

export default UsageStats;