import styled from '@emotion/styled';
import theme from '../../../../common/theme';

interface InputStyleProps {
  width: string;
}

export const InputTag = styled.input<InputStyleProps>`
  width: ${(props) => props.width};
  border: none;
  border-bottom: 1px solid black;
  padding-left: 5px;
  font-size: 1.8rem;
  outline: none;

  &::placeholder {
    color: ${theme.color.color_brightness_700};
  }
`;
