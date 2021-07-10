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
      width={size}
      height={size}
      role="img" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 512 512" 
      className={className}
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
      className={className}
      width={size}
      height={size}
      role="img" xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 512 512"
    >
      <path fill={color} d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z"></path>
    </svg>
  )
}

export const ChevronUp = ({size = 25, color = "#e9e5dc", className=""}: IconProps) => {
  return (
    <svg 
      aria-hidden="true" 
      focusable="false" 
      className={className}
      role="img" 
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 -64 448 512"
    >
      <path fill={color} d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"></path>
    </svg>
  )
}

export const ChevronDown = ({size = 25, color = "#e9e5dc", className=""}: IconProps) => {
  return (
    <svg 
      aria-hidden="true" 
      focusable="false" 
      className={className}
      role="img" 
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 -64 448 512"
    >
      <path fill={color} d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
    </svg>
  )
}

export const EllipsisV = ({size = 25, color = "#e9e5dc", className=""}: IconProps) => {
  return (
    <svg 
      aria-hidden="true" 
      focusable="false" 
      className={className}
      role="img" 
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 192 512"
    >
      <path fill={color} d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"></path>
    </svg>
  )
}