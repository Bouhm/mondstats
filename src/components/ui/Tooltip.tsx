import './Tooltip.css';

import React, { ReactNode } from 'react';

type TooltipProps = {
  content: string
  alignment?: "horizontal" | "vertical" | "top"
}

function Tooltip({ content, alignment = "horizontal" }: TooltipProps) {
  let approxOffset = content.length*3
  let style = { left: "12rem", top: `30%` }

  switch (alignment) {
    case "vertical":
      style = { left: `${55 - approxOffset}%`, top: "35%" }
      break;
    case "top":
      style = { left: `${110 - approxOffset}%`, top: "35%" }
      break;
    default:
      break;
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