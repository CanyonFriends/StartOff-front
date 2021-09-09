import styled from '@emotion/styled';
import theme from '../../../../style/theme';

interface PageButtonProps {
  selected?: boolean;
}

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CenterWrapper = styled.div`
  display: flex;
`;

export const Spread = styled.span`
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: flex-end;
  font-size: 3rem;
`;

export const PageButton = styled.button<PageButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  padding: 0;
  font-size: 1.8rem;
  color: ${(props) => (props.selected ? theme.color.color_brightness_900 : theme.color.color_brightness_000)};
  background-color: ${(props) => (props.selected ? theme.color.color_primary_400 : theme.color.color_brightness_900)};
`;

export const BlankButton = styled.span`
  width: 4rem;
  height: 4rem;
`;
