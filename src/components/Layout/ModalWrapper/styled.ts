import styled from '@emotion/styled';
import theme from '../../../common/theme';

interface OverlayProps {
  isBlur: boolean;
}

export const Overlay = styled.div<OverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;

  opacity: ${(props) => (props.isBlur ? 0.1 : 0)};
  background-color: ${theme.color.color_brightness_000};
`;

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000;
  background-color: ${theme.color.color_brightness_900};
  border-radius: 0.5rem;
`;
