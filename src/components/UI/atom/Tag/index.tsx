import React from 'react';
import * as Style from './styled';
import theme from '../../../../common/theme';

export interface TagProps {
  skillId: string;
  skillName: string;
  color?: string;
  textColor?: string;
  onClickClose?: (id: string) => void;
}

function Tag({
  skillId,
  skillName,
  color = theme.color.color_brightness_000,
  textColor = theme.color.color_brightness_800,
  onClickClose,
}: TagProps) {
  return (
    <Style.Container textColor={textColor} color={color} availableClose={!!onClickClose}>
      {skillName}
      {onClickClose && <Style.CloseButton onClick={() => onClickClose(skillId)}>x</Style.CloseButton>}
    </Style.Container>
  );
}

export default Tag;
