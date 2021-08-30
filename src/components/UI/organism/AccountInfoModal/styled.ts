import styled from '@emotion/styled';
import theme from '../../../../common/theme';

export const Container = styled.div`
  width: 41rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 2rem;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 30rem;
`;

export const InputWrapper = styled.div`
  width: 100%;
  height: 6rem;
  &:first-of-type,
  &:nth-of-type(2) {
    padding-bottom: 1rem;
  }
  &:nth-of-type(3) {
    padding-top: 1rem;
  }
`;

export const Error = styled.span`
  height: 15px;
  font-size: 1.5rem;
  color: ${theme.color.color_warning_100};
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 1.5rem 0 1rem 0;
  background-color: ${theme.color.color_brightness_700};
`;
