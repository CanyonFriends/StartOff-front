import styled from '@emotion/styled';
import { anchorSizeSelector } from './style-selector';
import { AnchorSizeType } from '../../@types/index';

interface LinkStyleProps {
  textColor: string;
  hoverColor: string;
  bolder: boolean;
  size: AnchorSizeType;
}

export const Container = styled.div<LinkStyleProps>`
  width: fit-content;
  color: ${(props) => props.textColor};
  font-weight: ${(props) => (props.bolder ? 'bold' : 'normal')};

  ${(props) => anchorSizeSelector[props.size]}

  &:hover {
    color: ${(props) => props.hoverColor};
  }
`;
