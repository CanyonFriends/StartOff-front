import React from 'react';
import * as Style from './styled';
import theme from '../../../../common/theme';

export interface TagProps {
  // text: string;
  // color?: string;
  // backgroundColor?: string;
  skillName: string;
  color?: string;
  textColor?: string;
  onClickClose?: () => void;
}

function Tag({
  skillName,
  color = theme.color.color_brightness_000,
  textColor = theme.color.color_brightness_800,
  onClickClose,
}: TagProps) {
  return (
    <Style.Container textColor={textColor} color={color} availableClose={!!onClickClose}>
      {skillName}
      {onClickClose && <Style.CloseButton onClick={onClickClose}>x</Style.CloseButton>}
    </Style.Container>
  );
}

export default Tag;
