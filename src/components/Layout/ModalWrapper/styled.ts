import styled from '@emotion/styled';
import theme from '../../../style/theme';

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000;
  background-color: ${theme.color.color_brightness_900};
  border-radius: 0.5rem;
`;
