import './Tooltip.css';

import React, { ReactNode } from 'react';

type TooltipProps = {
  children: ReactNode
  alignment?: "horizontal" | "vertical"
}

function Tooltip({ children, alignment = "horizontal" }: TooltipProps) {
  let style = { left: "35%", top: "35%" }

  if (alignment === "vertical") {
    style = { left: "25%", top: "35%" }
  }

  return (
    <div className="tooltip" style={style}>
      <div className="tooltip-content">
        {children}
      </div>
    </div>
  )
}

export default Tooltip