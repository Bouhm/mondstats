import './Tooltip.scss';

import React from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';

type TooltipProps = {
  children: JSX.Element,
  className?: string,
  content: string
}

function Tooltip({ children, content, className }: TooltipProps) {
  const {
    getTooltipProps,
    getArrowProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip();
  
  return (
    <div className={className} ref={setTriggerRef}>
      {children}
      {visible && 
        <div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container' })}>
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />
          {content}
        </div>
      }
    </div>
  )
}

export default Tooltip