import React from 'react';

type IconProps = {
  size?: number,
  color?: string,
  className?: string
}

export const Search = ({size = 25, color = "#e9e5dc", className=""}: IconProps) => {
  return (
    <svg 
      aria-hidden="true" 
      focusable="false" 
      data-prefix="fas" 
      data-icon="search"
      width={size}
      height={size}
      role="img" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 512 512" 
      className={`svg-inline--fa fa-search fa-w-16 fa-9x ${className}`}
    >
      <path fill={color} d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z">
      </path>
    </svg>
  )
}

export const Circle = ({size = 25, color = "#e9e5dc", className=""}: IconProps) => {
  return (
    <svg 
      aria-hidden="true" 
      focusable="false" 
      data-prefix="far" 
      data-icon="circle" 
      className={`svg-inline--fa fa-circle fa-w-16 ${className}`} 
      width={size}
      height={size}
      role="img" xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 512 512"
    >
      <path fill={color} d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z"></path>
    </svg>
  )
}