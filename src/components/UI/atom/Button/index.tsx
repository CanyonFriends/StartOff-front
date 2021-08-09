import React from 'react';
import { Link } from 'react-router-dom';
import * as Style from './styled';
import { SizeType, ButtonThemeType } from '../../@types/index';

export interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  width?: string;
  theme?: ButtonThemeType;
  size?: SizeType;
  iconOnly?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({
  children,
  onClick,
  to,
  theme = 'primary',
  size = 'small',
  iconOnly = false,
  width = 'fit-content',
}: ButtonProps) {
  return (
    <Style.Button onClick={onClick} theme={theme} size={size} iconOnly={iconOnly} width={width}>
      {to ? <Link to={to}>{children}</Link> : children}
    </Style.Button>
  );
}

export default Button;
