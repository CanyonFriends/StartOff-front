import React from 'react';
import * as Style from './styled';
import * as icons from './svg';
import { IconSizeType, IconType } from '../../@types/index';

interface IconProps {
  icon: IconType;
  size?: IconSizeType;
}

function Icon({ size = 'small', icon }: IconProps) {
  const SVGIcon = icons[icon];
  return (
    <Style.Container size={size}>
      <SVGIcon />
    </Style.Container>
  );
}

export default Icon;
