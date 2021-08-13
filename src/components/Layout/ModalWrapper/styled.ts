import styled from '@emotion/styled';

interface OverlayProps {
  backgroundColor: string;
}

export const Overlay = styled.div<OverlayProps>`
  position: fixed;
  width: 100vw;
  height: 100vh;

  background-color: ${(props) => props.backgroundColor};
`;

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
