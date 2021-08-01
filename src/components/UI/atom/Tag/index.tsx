import React from 'react';
import * as Style from './styled';
import theme from '../../../../common/theme';

interface TagProps {
  children: React.ReactNode;
  color?: string;
  backgroundColor?: string;
  onClickClose?: () => void;
}

function Tag({
  children,
  color = theme.color.color_brightness_000,
  backgroundColor = theme.color.color_brightness_800,
  onClickClose,
}: TagProps) {
  return (
    <Style.Container color={color} backgroundColor={backgroundColor} availableClose={!!onClickClose}>
      {children}
      {onClickClose && <Style.CloseButton onClick={onClickClose}>x</Style.CloseButton>}
    </Style.Container>
  );
}

export default Tag;
