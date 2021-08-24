import React from 'react';
import * as Style from './styled';
import theme from '../../../../common/theme';

export interface TagProps {
  id: string;
  name: string;
  color?: string;
  textColor?: string;
  onClickClose?: (id: string) => void;
}

function Tag({
  id,
  name,
  color = theme.color.color_brightness_000,
  textColor = theme.color.color_brightness_800,
  onClickClose,
}: TagProps) {
  return (
    <Style.Container textColor={textColor} color={color} availableClose={!!onClickClose}>
      {name}
      {onClickClose && <Style.CloseButton onClick={() => onClickClose(id)}>x</Style.CloseButton>}
    </Style.Container>
  );
}

export default Tag;
