import React from 'react';
import * as Style from './styled';
import theme from '../../../../common/theme';
import { LabelSizeType } from '../../@types/index';

interface LabelProps {
  children: React.ReactNode;
  group?: string;
  color?: string;
  size?: LabelSizeType;
}

function Label({ children, group = '', color = theme.color.color_brightness_000, size = 'small' }: LabelProps) {
  return (
    <Style.Container htmlFor={group} color={color} size={size}>
      {children}
    </Style.Container>
  );
}

export default Label;
