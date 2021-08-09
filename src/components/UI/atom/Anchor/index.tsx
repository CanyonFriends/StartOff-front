import React from 'react';
import { Link } from 'react-router-dom';
import theme from '../../../../common/theme';
import * as Style from './styled';
import { SizeType } from '../../@types/index';

interface AnchorProps {
  children: React.ReactNode;
  to: string;
  size?: SizeType;
  color?: string;
  bolder?: boolean;
  hoverColor?: string;
}

function Anchor({
  children,
  to,
  size = 'small',
  color = theme.color.color_brightness_000,
  bolder = false,
  hoverColor = 'inherit',
}: AnchorProps) {
  return (
    <Style.Container bolder={bolder} textColor={color} hoverColor={hoverColor} size={size}>
      <Link to={to}>{children}</Link>
    </Style.Container>
  );
}

export default Anchor;
