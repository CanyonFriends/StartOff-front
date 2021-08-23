import styled from '@emotion/styled';
import theme from '../../../../common/theme';

export const Form = styled.form`
  height: 12.5rem;
`;

export const Top = styled.div`
  width: 50rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DummyImage = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 4rem;
  background-color: ${theme.color.color_brightness_400};
`;

export const NicknameWrapper = styled.div`
  width: 34rem;
`;

export const Bottom = styled.div`
  margin-top: 2rem;
`;
