
import { useState } from 'react';

export function useTabs(defaultIdx = 0) {
  const [activeTabIdx, setCurrentTabIdx] = useState(defaultIdx)

  const onTabChange = (tabIdx: number) => {
    setCurrentTabIdx(tabIdx);
  }

  return {
    activeTabIdx,
    onTabChange
  }
}