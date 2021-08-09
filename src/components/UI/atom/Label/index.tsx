import React from 'react';
import * as Style from './styled';
import theme from '../../../../common/theme';
import { SizeType } from '../../@types/index';

export interface LabelProps {
  content: string;
  group?: string;
  color?: string;
  size?: SizeType;
}

function Label({ content, group = '', color = theme.color.color_brightness_000, size = 'small' }: LabelProps) {
  return (
    <Style.Container htmlFor={group} color={color} size={size}>
      {content}
    </Style.Container>
  );
}

export default Label;
