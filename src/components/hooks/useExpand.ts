import { useState } from 'react';

function useExpand(isExpanded=false) {
  const [ expanded, setExpanded ] = useState(isExpanded);
  
  const handleExpand = () => {
    setExpanded(!expanded);
  }

  return {
    handleExpand,
    expanded
  }
}

export default useExpand;