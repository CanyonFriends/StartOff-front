import styled from '@emotion/styled';
import { SizeType } from '../../@types/index';
import { labelSizeSelector } from './style-selector';

interface LabelStyleProps {
  color: string;
  size: SizeType;
  bolder: boolean;
}

export const Container = styled.label<LabelStyleProps>`
  color: ${(props) => props.color};
  font-weight: ${(props) => (props.bolder ? 'bolder' : 'normal')};

  ${(props) => labelSizeSelector[props.size]}
`;
