import React from 'react';
import * as Style from './styled';
import * as icons from './svg';
import { IconSizeType, IconType } from '../../@types/index';
import theme from '../../../../common/theme';

interface IconProps {
  icon: IconType;
  color?: string;
  size?: IconSizeType;
}

function Icon({ size = 'small', color = theme.color.color_brightness_000, icon }: IconProps) {
  const SVGIcon = icons[icon];
  return (
    <Style.Container size={size} svgColor={color}>
      <SVGIcon />
    </Style.Container>
  );
}

export default Icon;
