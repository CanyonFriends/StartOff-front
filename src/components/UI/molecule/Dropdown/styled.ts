import styled from '@emotion/styled';
import theme from '../../../../style/theme';

interface ItemProps {
  selected?: boolean;
}

export const Container = styled.div`
  position: relative;
  width: max-content;
`;

export const MenuWrapper = styled.ul`
  width: 120%;
  position: absolute;
  top: 4.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  z-index: 3000;
  -webkit-box-shadow: 5px 8px 27px 3px rgba(0, 0, 0, 0.39);
  box-shadow: 5px 8px 27px 3px rgba(0, 0, 0, 0.39);
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: ${theme.color.color_brightness_900};
`;

export const Item = styled.li<ItemProps>`
  padding: 0.2rem 0.5rem;
  font-size: 1.8rem;
  cursor: pointer;

  background-color:${(props) => (props.selected ? theme.color.color_brightness_600 : theme.color.color_brightness_900)}

  &:hover {
    background-color: ${theme.color.color_brightness_800};
  }
`;
