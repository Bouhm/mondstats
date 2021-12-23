import { useState } from 'react';

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