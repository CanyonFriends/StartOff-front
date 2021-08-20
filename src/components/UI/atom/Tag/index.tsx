import React from 'react';
import * as Style from './styled';
import theme from '../../../../common/theme';

export interface TagProps {
  text: string;
  color?: string;
  backgroundColor?: string;
  onClickClose?: () => void;
}

function Tag({
  text,
  color = theme.color.color_brightness_000,
  backgroundColor = theme.color.color_brightness_800,
  onClickClose,
}: TagProps) {
  return (
    <Style.Container color={color} backgroundColor={backgroundColor} availableClose={!!onClickClose}>
      {text}
      {onClickClose && <Style.CloseButton onClick={onClickClose}>x</Style.CloseButton>}
    </Style.Container>
  );
}

export default Tag;
