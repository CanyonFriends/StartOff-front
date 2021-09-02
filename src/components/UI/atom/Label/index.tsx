import React from 'react';
import * as Style from './styled';
import theme from '../../../../style/theme';
import { SizeType } from '../../@types/index';

export interface LabelProps {
  content: string;
  id?: string;
  group?: string;
  color?: string;
  size?: SizeType;
  bolder?: boolean;
}

function Label({
  content,
  id = '',
  group = '',
  color = theme.color.color_brightness_000,
  size = 'small',
  bolder = false,
}: LabelProps) {
  return (
    <Style.Container aria-label={id} htmlFor={group} color={color} size={size} bolder={bolder}>
      {content}
    </Style.Container>
  );
}

export default Label;
