import styled from '@emotion/styled';
import { TitleSizeType } from '../../@types/index';
import { titleSizeSelector } from './style-selector';

interface TitleStyleProps {
  color: string;
  fontsize: TitleSizeType;
}

export const Title1 = styled.h1<TitleStyleProps>`
  color: ${(props) => props.color};
  ${(props) => titleSizeSelector[props.fontsize]}
`;
export const Title2 = styled.h2<TitleStyleProps>`
  color: ${(props) => props.color};
  ${(props) => titleSizeSelector[props.fontsize]}
`;

export const Title3 = styled.h3<TitleStyleProps>`
  color: ${(props) => props.color};
  ${(props) => titleSizeSelector[props.fontsize]}
`;

export const Title4 = styled.h4<TitleStyleProps>`
  color: ${(props) => props.color};
  ${(props) => titleSizeSelector[props.fontsize]}
`;

export const Title5 = styled.h5<TitleStyleProps>`
  color: ${(props) => props.color};
  ${(props) => titleSizeSelector[props.fontsize]}
`;

export const Title6 = styled.h6<TitleStyleProps>`
  color: ${(props) => props.color};
  ${(props) => titleSizeSelector[props.fontsize]}
`;
