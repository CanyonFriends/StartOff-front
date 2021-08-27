import styled from '@emotion/styled';
import theme from '../../../../common/theme';
import { SizeType } from '../../@types/index';
import { textareaSizeSelector } from './style-selector';

interface TextAreaStyleProps {
  size: SizeType;
}

export const TextArea = styled.textarea<TextAreaStyleProps>`
  border: 2px solid black;
  padding: 2px;
  font-size: 1.8rem;
  outline: none;
  height: 100%;
  width: 100%;
  resize: none;
  border: 1px solid ${theme.color.color_brightness_000};

  ${(props) => textareaSizeSelector[props.size]}
  &::placeholder {
    color: ${theme.color.color_brightness_700};
  }
`;
