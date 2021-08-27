import React from 'react';
import * as Style from './styled';
import theme from '../../../../common/theme';
import { SizeType } from '../../@types/index';

export interface LabelProps {
  content: string;
  group?: string;
  color?: string;
  size?: SizeType;
  bolder?: boolean;
}

function Label({
  content,
  group = '',
  color = theme.color.color_brightness_000,
  size = 'small',
  bolder = false,
}: LabelProps) {
  return (
    <Style.Container htmlFor={group} color={color} size={size} bolder={bolder}>
      {content}
    </Style.Container>
  );
}

export default Label;
