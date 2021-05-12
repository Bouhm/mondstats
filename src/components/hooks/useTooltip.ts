import React, { MouseEvent, MouseEventHandler } from "react"
import { ReactNode, useState } from "react"
import Tooltip from "../ui/Tooltip"

function useTooltip() {
  const [hoveredId, setHoveredId] = useState<number|string|undefined>(undefined)

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>, id: number|string) => {
    console.log(e.currentTarget.classList);
    if (!e.currentTarget.classList.contains("bar-chart-bar")) {
      setHoveredId(undefined);
      return;
    }

    setHoveredId(id)
    console.log(hoveredId)
  }

  const handleMouseLeave = () => {
    setHoveredId(undefined)
  }

  const isHovered = (id: number|string) => {
    console.log(id, hoveredId)
    return id === hoveredId
  }

  return {
    handleMouseEnter,
    handleMouseLeave,
    isHovered
  }
}

export default useTooltip