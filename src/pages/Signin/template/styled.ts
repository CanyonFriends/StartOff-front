import styled from '@emotion/styled';
import theme from '../../../style/theme';

export const Container = styled.main`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const MoveContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 30px;
`;

export const NoAccountText = styled.span`
  font-size: 1.4rem;
  color: ${theme.color.color_brightness_500};
`;

export const GithubSigninText = styled.span`
  margin-left: 3rem;
`;
