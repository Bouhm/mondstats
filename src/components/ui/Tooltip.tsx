import './Tooltip.css';

import React, { ReactNode } from 'react';

type TooltipProps = {
  content: string
  alignment?: "horizontal" | "vertical"
}

function Tooltip({ content, alignment = "horizontal" }: TooltipProps) {
  let approxOffset = content.length*3
  let style = { left: "35%", top: `35%` }

  if (alignment === "vertical") {
    style = { left: `${55 - approxOffset}%`, top: "35%" }
  }

  return (
    <div className="tooltip" style={style}>
      <div className="tooltip-content">
        {content}
      </div>
    </div>
  )
}

export default Tooltip