import styled from '@emotion/styled';
import theme from '../../../../style/theme';

export const Container = styled.div`
  padding: 0 2rem 1rem 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 5fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    'header header'
    'url content';
  border: 1px solid ${theme.color.color_brightness_000};
  border-radius: 0.5rem;
`;

export const Header = styled.header`
  grid-area: header;
`;

export const Left = styled.div`
  grid-area: url;
  display: flex;
  height: 7rem;
  flex-direction: column;
  justify-content: space-between;
`;

export const Right = styled.div`
  grid-area: content;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const IconWrapper = styled.div`
  display: flex;
`;

export const SkillWrapper = styled.ul`
  padding: 0;
  margin-bottom: 2rem;
  display: flex;
`;

export const SkillItem = styled.li`
  margin-right: 1rem;
`;

export const DateWrapper = styled.div`
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

export const IntroduceWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const Url = styled.span`
  font-size: 1.8rem;
`;

export const ContentWrapper = styled.div``;
