import styled from '@emotion/styled';
import { IconSizeType } from '../../@types/index';
import { iconSizeSelector } from './style-selector';

interface IconStyleProps {
  size: IconSizeType;
}

export const Container = styled.div<IconStyleProps>`
  cursor: pointer;

  ${(props) => iconSizeSelector[props.size]}
`;
