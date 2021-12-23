import React from 'react';
import LazyLoad from 'react-lazyload';

type LLImageProps = {
  src: string,
  alt?: string,
  className?: string,
  children?: JSX.Element | null
}

function LLImage({ src, alt="", className="", children=null }: LLImageProps) { 
  return <LazyLoad><img className={className} src={src} alt={alt} />
    {children}
  </LazyLoad>
}

export default LLImage;