import styled from '@emotion/styled';
import { SizeType } from '../../@types/index';
import { iconSizeSelector } from './style-selector';

interface IconStyleProps {
  size: SizeType;
  svgColor: string;
}

export const Container = styled.div<IconStyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 1rem;

  ${(props) => iconSizeSelector[props.size]}

  svg {
    fill: ${(props) => props.svgColor};
  }
`;
