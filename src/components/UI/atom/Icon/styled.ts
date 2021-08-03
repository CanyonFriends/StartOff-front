import styled from '@emotion/styled';
import { IconSizeType } from '../../@types/index';
import { iconSizeSelector } from './style-selector';

interface IconStyleProps {
  size: IconSizeType;
}

export const Container = styled.div<IconStyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${(props) => iconSizeSelector[props.size]}
`;
