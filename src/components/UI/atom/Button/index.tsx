import React from 'react';
import { Link } from 'react-router-dom';
import * as Style from './styled';
import { SizeType, ButtonThemeType } from '../../@types/index';

export interface ButtonProps {
  children: React.ReactNode;
  id?: string;
  formButton?: boolean;
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
  id,
  to,
  formButton = true,
  theme = 'primary',
  size = 'small',
  iconOnly = false,
  width = 'fit-content',
}: ButtonProps) {
  return (
    <Style.Button
      aria-label={id}
      type={formButton ? 'submit' : 'button'}
      onClick={onClick}
      theme={theme}
      size={size}
      iconOnly={iconOnly}
      width={width}
    >
      {to ? <Link to={to}>{children}</Link> : children}
    </Style.Button>
  );
}

export default Button;
