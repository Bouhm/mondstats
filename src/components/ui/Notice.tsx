import './Notice.scss';

import React, { ReactNode } from 'react';

function Notice({children}: { children: ReactNode }) {
  return <div className="notice">
    {children}
  </div>
}

export default Notice