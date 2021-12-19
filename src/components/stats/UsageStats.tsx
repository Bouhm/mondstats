import React from 'react';

import { getPercentage } from '../../scripts/util';

type UsageStatsProps = {
  count: number,
  total: number
}

function UsageStats({ count, total }: UsageStatsProps) {
  return (
    <div className="usage-stats-container">
      <div className="usage-stats">
        <h2 className="usage-stats-title">
          Overall Usage
        </h2>
        <div className="usage-stats-content usage-stats-popularity">
          {/* 14 <Delta current={14} last={13} /> */}
        </div>
      </div>
      <div className="usage-stats-abyss">
        <div className="usage-stats">
          <h2 className="usage-stats-title">
            Abyss Usage
          </h2>
          <div className="usage-stats-content usage-stats-pct">
            {getPercentage(count, total) }%
            {/* <Delta current={getPercentage(selectedCharacterBuilds.count, selectedCharacterBuilds.total)} last={22.34} /> */}
          </div>
        </div>
      </div>
    </div> 
  )
}

export default UsageStats;