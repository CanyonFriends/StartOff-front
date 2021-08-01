import styled from '@emotion/styled';
import { ButtonSizeType, ButtonThemeType } from '../../@types/index';
import { buttonSizeSelector, buttonThemeSelector, iconOnlyTheme } from './style-selector';

interface ButtonStyleProps {
  width: string;
  theme: ButtonThemeType;
  size: ButtonSizeType;
  iconOnly: boolean;
}

export const Button = styled.button<ButtonStyleProps>`
  width: ${(props) => props.width};
  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 0.25rem;
  background-color: white;
  font-weight: bold;

  ${(props) => (props.iconOnly ? iconOnlyTheme : buttonThemeSelector[props.theme as ButtonThemeType])};
  ${(props) => !props.iconOnly && buttonSizeSelector[props.size]}
`;
