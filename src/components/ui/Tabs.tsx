import './Tabs.scss';

import { map } from 'lodash';
import React, { ReactNode } from 'react';

type TabsProps = {
  tabs: string[] | ReactNode[]
  activeTabIdx: number;
  onChange: (tabIdx: number) => void;
}

const Tabs = ({ tabs, activeTabIdx, onChange }: TabsProps) => {
  return (
    <div className="tabs-container">
      {map(tabs, (tab, i) => <div 
        key={`tab-${i}`}
        className={`tab ${activeTabIdx === i ? 'asActive' : ''}`} 
        onClick={() => onChange(i)}
      >
        {tab}
      </div>)}
    </div>
  )
}

export default Tabs; 