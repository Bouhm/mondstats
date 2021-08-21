import { filter } from 'lodash';
import { useEffect, useState } from 'react';

export function usePaginate(pageSize = 20) {
  const [currentPage, setCurrentPage] = useState(1)
  const [indexes, setIndexes] = useState([0, pageSize - 1 ]);

  useEffect(() => {
    setIndexes ([(currentPage - 1) * pageSize, currentPage * pageSize - 1])
  }, [currentPage])

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleReset = () => {
    setCurrentPage(1);
  }

  const filterPageContent = (data: any[]) => {
    return filter(data, (_: any ,i: number) => indexes[0] <= i && indexes[1] >= i)
  }

  return {
    currentPage,
    filterPageContent,
    handleReset,
    onPageChange
  }
}

export default usePaginate;