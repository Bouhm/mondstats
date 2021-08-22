import { useState } from "react";

function useExpand() {
  const [ expanded, setExpanded ] = useState(false);
  
  const handleExpand = () => {
    setExpanded(!expanded);
  }

  return {
    handleExpand,
    expanded
  }
}

export default useExpand;