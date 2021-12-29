import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

export function useTabs(defaultIdx = 0) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTabIdx, setCurrentTabIdx] = useState(defaultIdx)

  const onTabChange = (tabIdx: number) => {
    setCurrentTabIdx(tabIdx);
  }

  return {
    activeTabIdx,
    onTabChange
  }
}