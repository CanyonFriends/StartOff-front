import styled from '@emotion/styled';
import theme from '../../../../common/theme';

interface FinishTagProps {
  isFinished: boolean;
}

export const Container = styled.li`
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const Left = styled.div``;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const FinishTag = styled.div<FinishTagProps>`
  padding: 0.2rem 1rem;
  margin-left: 2rem;
  height: fit-content;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 0.5rem;
  color: ${theme.color.color_brightness_900};
  background-color: ${(props) => (props.isFinished ? theme.color.color_success_100 : theme.color.color_warning_100)};
`;

export const SkillWrapper = styled.ul`
  padding: 0;
  display: flex;
`;

export const SkillItem = styled.li`
  margin-right: 1rem;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const Nickname = styled.span`
  font-size: 2.4rem;
`;

export const Date = styled.span`
  font-size: 1.8rem;
  color: ${theme.color.color_brightness_600};
`;
