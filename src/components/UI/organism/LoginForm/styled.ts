import styled from '@emotion/styled';
import theme from '../../../../common/theme';

export const Container = styled.form`
  width: 320px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const InputWrapper = styled.div`
  width: 100%;
  height: 50px;
`;

export const Error = styled.span`
  height: 15px;
  font-size: 1.5rem;
  color: ${theme.color.color_warning_100};
`;
