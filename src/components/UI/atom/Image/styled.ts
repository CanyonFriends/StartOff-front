import styled from '@emotion/styled';

interface ImageStyleProps {
  width: string;
  height: string;
}

export const Image = styled.img<ImageStyleProps>`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;
