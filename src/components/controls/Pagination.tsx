import './Pagination.scss';

import _Pagination from 'rc-pagination';
import React from 'react';

type PaginationProps = {
  total: number,
  pageSize: number,
  current: number,
  onChange: (page: number) => void
}

function Pagination(props: PaginationProps) {
  return <div className="pagination-container">
    <_Pagination showTitle={false} {...props} /> 
  </div>
}

export default Pagination;