import styled from '@emotion/styled';
import theme from '../../../../style/theme';

interface DateWrapperProps {
  isDateSelected: boolean;
}

export const Container = styled.div`
  width: 25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  font-size: 1.5rem;
  z-index: 3000;
`;

export const DateWrapper = styled.div<DateWrapperProps>`
  border-radius: 0.5rem;
  background: ${(props) => (props.isDateSelected ? theme.color.color_primary_400 : theme.color.color_primary_300)};
  color: ${(props) => (props.isDateSelected ? theme.color.color_brightness_900 : theme.color.color_brightness_900)};
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const CalendarWrapper = styled.div`
  position: absolute;
  top: 3.5rem;
  left: 50%;
  transform: translateX(-50%);
`;
