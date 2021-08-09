import styled from '@emotion/styled';
import { SizeType } from '../../@types/index';
import { labelSizeSelector } from './style-selector';

interface LabelStyleProps {
  color: string;
  size: SizeType;
}

export const Container = styled.label<LabelStyleProps>`
  color: ${(props) => props.color};

  ${(props) => labelSizeSelector[props.size]}
`;
