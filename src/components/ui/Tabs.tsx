import './Tabs.scss';

import React, { useState } from 'react';
import { map } from 'lodash';

type TabsProps = {
  tabs: string[]
  activeTabIdx: number;
  onChange: (tabIdx: number) => void;
}

export function useTabs() {
  const [activeTabIdx, setCurrentTabIdx] = useState(0)

  const onTabChange = (tabIdx: number) => {
    setCurrentTabIdx(tabIdx);
  }

  return {
    activeTabIdx,
    onTabChange
  }
}

const Tabs = ({ tabs, activeTabIdx, onChange }: TabsProps) => {
  return (
    <div className="tabs-container">
      {map(tabs, (tab, i) => <div 
        key={tab}
        className={`tab ${activeTabIdx === i ? 'asActive' : ''}`} 
        onClick={() => onChange(i)}
      >
        {tab}
      </div>)}
    </div>
  )
}

export default Tabs; 