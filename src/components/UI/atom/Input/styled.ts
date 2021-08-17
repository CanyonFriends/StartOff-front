import styled from '@emotion/styled';
import theme from '../../../../common/theme';
import { SizeType } from '../../@types/index';
import { inputSizeSelector } from './style-selector';

interface InputStyleProps {
  width: string;
  inputSize: SizeType;
}

export const InputTag = styled.input<InputStyleProps>`
  width: ${(props) => props.width};
  border: none;
  border-bottom: 1px solid black;
  padding-left: 5px;
  outline: none;
  background-color: transparent;

  ${(props) => inputSizeSelector[props.inputSize]}
  &::placeholder {
    color: ${theme.color.color_brightness_700};
  }
`;
