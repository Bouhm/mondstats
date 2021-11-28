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
      className={"icon " + className}
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
      className={"icon " + className}
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
      className={"icon " + className}
      role="img" 
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 -48 448 512"
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
      className={"icon " + className}
      role="img" 
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 -96 448 512"
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
      className={"icon " + className}
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

export const Close = ({size = 25, color = "#e9e5dc", className=""}: IconProps) => {
  return (
    <svg 
      aria-hidden="true" 
      focusable="false" 
      className={"icon " + className}
      role="img" 
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 352 512"
    >
      <path fill={color} d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
    </svg>
  )
}

export const Plus = ({size = 25, color = "#e9e5dc", className=""}: IconProps) => {
  return (
    <svg 
      aria-hidden="true" 
      focusable="false" 
      className={"icon " + className}
      role="img" 
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 448 512"
    >
      <path fill={color} d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
    </svg>
  )
}

export const Hamburger = ({size = 25, color = "#e9e5dc", className=""}: IconProps) => {
  return (
    <svg 
      aria-hidden="true" 
      focusable="false" 
      className={"icon " + className}
      role="img" 
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 448 512"
    >
      <path fill={color} d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
    </svg>
  )
}

export const Exchange = ({size = 25, color = "#e9e5dc", className=""}: IconProps) => {
  return (
    <svg 
      aria-hidden="true" 
      focusable="false" 
      className={"icon " + className}
      role="img" 
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 512 512"
    >
      <path fill={color} d="M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z"></path>
    </svg>
  )
}

export const CaretUp = ({size = 25, color = "#e9e5dc", className=""}: IconProps) => {
  return (
    <svg 
      aria-hidden="true" 
      focusable="false" 
      className={"icon " + className} 
      role="img" 
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 320 416"
    >
      <path fill={color} d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"></path>
    </svg>
  )
}

export const CaretDown = ({size = 25, color = "#e9e5dc", className=""}: IconProps) => {
  return (
    <svg 
      aria-hidden="true" 
      focusable="false" 
      className={"icon " + className}
      role="img" 
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 320 416"
    >
      <path fill={color} d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
    </svg>
  )
}