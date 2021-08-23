import styled from '@emotion/styled';

export const Container = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    'header .'
    'info image'
    'project project';
`;

export const ProfileHeaderWrapper = styled.div`
  grid-area: header;
`;

export const ProfileInfoWrapper = styled.div`
  height: 280px;
  grid-area: info;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  input {
    width: 80%;
  }
`;

export const ProfileImageWrapper = styled.div`
  grid-area: image;
`;

export const ProfileProjectsWrapper = styled.div`
  grid-area: project;
`;
