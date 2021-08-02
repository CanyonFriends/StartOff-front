import styled from '@emotion/styled';

interface ImageStyleProps {
  src: string;
  width: string;
  height: string;
}

export const Image = styled.img<ImageStyleProps>`
  src: url(${(props) => props.src});
  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;
