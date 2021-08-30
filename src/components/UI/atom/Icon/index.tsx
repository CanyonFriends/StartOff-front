import React from 'react';
import * as Style from './styled';
import * as icons from './svg';
import { SizeType, IconType } from '../../@types/index';
import theme from '../../../../common/theme';

export interface IconProps {
  id?: string;
  icon: IconType;
  color?: string;
  size?: SizeType;
  onClick?: () => void;
}

function Icon({ id = '', size = 'small', color = theme.color.color_brightness_000, icon, onClick }: IconProps) {
  const SVGIcon = icons[icon];
  return (
    <Style.Container aria-label={id} size={size} svgColor={color} onClick={onClick}>
      <SVGIcon />
    </Style.Container>
  );
}

export default Icon;
