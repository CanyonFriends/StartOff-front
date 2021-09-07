import styled from '@emotion/styled';

export const Container = styled.div`
  margin: 0 auto;
  margin-top: 7rem;
  max-width: 1050px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;

  form {
    width: 80%;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
`;

export const PostList = styled.ul`
  padding: 0;
  margin-top: 5rem;
  list-style: none;

  > li {
    margin: 2rem 0;
  }
`;
