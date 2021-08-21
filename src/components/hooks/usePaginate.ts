import React from 'react';
import { useState } from 'react';

export function usePaginate(pageSize = 15) {
  const [currentPage, setCurrentPage] = useState(1)
  const [indexes, setIndexes] = useState([0, pageSize - 1 ]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    setIndexes ([(page - 1) * pageSize, page * pageSize - 1])
  };

  return {
    currentPage,
    indexes,
    onPageChange
  }
}

export default usePaginate;