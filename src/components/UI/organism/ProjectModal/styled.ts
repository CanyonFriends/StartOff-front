import styled from '@emotion/styled';
import theme from '../../../../style/theme';

export const Container = styled.form`
  padding: 2rem 4rem 4rem 4rem;
  width: 60rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const InputWrapper = styled.div`
  width: 100%;
  height: 6rem;
  box-sizing: border-box;
  padding-top: 1rem;
  margin-top: 0.8rem;
  &:nth-of-type(5) {
    margin-bottom: 1rem;
  }
`;

export const CalendarWrapper = styled(InputWrapper)`
  /* height: 9rem; */
`;

export const TextAreaWrapper = styled.div`
  height: 10rem;
`;

export const Error = styled.span`
  height: 15px;
  margin: 1rem 0;
  font-size: 1.5rem;
  color: ${theme.color.color_warning_100};
`;
