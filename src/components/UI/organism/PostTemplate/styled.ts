import styled from '@emotion/styled';
import theme from '../../../../style/theme';

interface FinishTagProps {
  isFinished: boolean;
}

export const Container = styled.div``;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
`;

export const FinishTag = styled.div<FinishTagProps>`
  padding: 0.2rem 1rem;
  margin-left: 2rem;
  height: fit-content;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 0.5rem;
  color: ${theme.color.color_brightness_900};
  background-color: ${(props) => (props.isFinished ? theme.color.color_warning_100 : theme.color.color_success_100)};
`;

export const ContentWrapper = styled.div`
  font-size: 18px;
  margin-top: 4rem;
`;

export const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
`;

export const TagItem = styled.li`
  margin-right: 1rem;
`;
