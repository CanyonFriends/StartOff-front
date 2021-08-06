import styled from '@emotion/styled';
import theme from '../../../../common/theme';

interface TextAreaStyleProps {
  cols: number;
  rows: number;
}

export const TextArea = styled.textarea<TextAreaStyleProps>`
  border: 2px solid black;
  padding: 2px;
  font-size: 1.8rem;
  outline: none;
  &::placeholder {
    color: ${theme.color.color_brightness_700};
  }
`;
