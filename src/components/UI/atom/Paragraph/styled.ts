import styled from '@emotion/styled';
import { SizeType } from '../../@types';
import { paragraphSizeSelector } from './style-selector';

interface ParagraphStyleProps {
  size: SizeType;
}

export const Paragraph = styled.p<ParagraphStyleProps>`
  margin: 0;

  ${(props) => paragraphSizeSelector[props.size]}
`;
