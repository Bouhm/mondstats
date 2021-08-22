import React from "react";
import LazyLoad from 'react-lazyload';

type LLImageProps = {
  src: string,
  alt?: string,
  className?: string,
}

function LLImage({ src, alt="", className="" }: LLImageProps) { 
  return <LazyLoad><img className={className} src={src} alt={alt} /></LazyLoad>
}

export default LLImage;