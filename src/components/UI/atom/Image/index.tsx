import React from 'react';
import * as Style from './styled';

export interface ImageProps {
  src: string;
  width: string;
  height: string;
  alt?: string;
}

function Image({ src, width = 'fit-content', height = 'fit-content', alt }: ImageProps) {
  return <Style.Image src={src} width={width} height={height} alt={alt} />;
}

export default Image;
