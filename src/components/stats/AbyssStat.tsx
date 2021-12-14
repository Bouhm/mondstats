import './AbyssStat.scss';

import React from 'react';

type AbyssStatProps = {
  label: string,
  value: string
}

function AbyssStat({ label, value }: AbyssStatProps) {
  return (
    <div className="abyss-stat">
      <div className='abyss-stat-label'>{label}</div>
      <div className='abyss-stat-value'>{value}</div>
    </div>
  )
}

export default AbyssStat;