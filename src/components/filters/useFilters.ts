import { useEffect, useState } from 'react';

const useFilters = () => {
  // const [filters, setFilters] = useState({})
  const [f2p, setF2p] = useState(false)
  const [max5, setMax5] = useState(0)

  const handleToggleF2p = () => {
    setF2p(!f2p)
  }

  const handleMax5Change = (value: number) => {
    setMax5(value)
  }

  return {
    f2p,
    max5,
    handleToggleF2p,
    handleMax5Change
  }
}

export default useFilters;