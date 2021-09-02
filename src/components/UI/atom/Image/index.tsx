import React from 'react';
import * as Style from './styled';

export interface ImageProps {
  src: string;
  width?: string;
  height?: string;
  id?: string;
  alt?: string;
}

function Image({ id = '', src, width = 'fit-content', height = 'fit-content', alt }: ImageProps) {
  return <Style.Image aria-label={id} src={src} width={width} height={height} alt={alt} />;
}

export default Image;
