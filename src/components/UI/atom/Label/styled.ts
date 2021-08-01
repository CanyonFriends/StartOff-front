import styled from '@emotion/styled';
import { LabelSizeType } from '../../@types/index';
import { labelSizeSelector } from './style-selector';

interface LabelStyleProps {
  color: string;
  size: LabelSizeType;
}

export const Container = styled.label<LabelStyleProps>`
  color: ${(props) => props.color};

  ${(props) => labelSizeSelector[props.size]}
`;
