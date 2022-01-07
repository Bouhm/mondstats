import './Button.scss';

import React, { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode,
  className?: string,
  onClick: () => void
}

const Button = ({children, onClick, className=""}: ButtonProps) => {
  const handleClick = () => {
    onClick();
  }

  return (
    <div className={`button ${className}`} onClick={handleClick}>
      {children}
    </div>
  )
}

export default Button;