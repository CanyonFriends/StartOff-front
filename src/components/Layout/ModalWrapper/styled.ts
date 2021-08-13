import styled from '@emotion/styled';
import theme from '../../../common/theme';

interface OverlayProps {
  isBlur: boolean;
}

export const Overlay = styled.div<OverlayProps>`
  position: fixed;
  width: 100vw;
  height: 100vh;

  opacity: ${(props) => (props.isBlur ? 0.3 : 0)};
  background-color: ${theme.color.color_brightness_000};
`;

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
