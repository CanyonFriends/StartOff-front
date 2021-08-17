import styled from '@emotion/styled';

interface ButtonContainerProps {
  singleButton: boolean;
}

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
`;

export const Nav = styled.ul`
  display: flex;
  padding: 0;
  margin-left: 3rem;
`;

export const NavItem = styled.li`
  display: flex;
  align-items: center;
  margin: 0 1.5rem;
`;

export const ButtonContainer = styled.div<ButtonContainerProps>`
  width: 10rem;
  display: flex;
  justify-content: ${(props) => (props.singleButton ? 'flex-end' : 'space-between')};
  align-items: center;
`;
