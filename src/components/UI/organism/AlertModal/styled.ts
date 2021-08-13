import styled from '@emotion/styled';
import theme from '../../../../common/theme';

export const Container = styled.div`
  width: 30rem;
  height: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  border-radius: 0.5rem;
  background-color: ${theme.color.color_brightness_900};
`;

export const Text = styled.p`
  width: 80%;
  height: 3.2rem;
  margin-top: 0;
  margin-bottom: 2rem;

  font-size: 1.5rem;
  text-align: center;
`;
