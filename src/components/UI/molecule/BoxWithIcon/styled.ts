import styled from '@emotion/styled';
import { SortDirectionType } from '../../@types/index';

interface ContainerStyle {
  sortDirection: SortDirectionType;
}

export const Container = styled.div<ContainerStyle>`
  display: flex;
  flex-direction: ${(props) => props.sortDirection};
  justify-content: space-between;
  align-items: center;
`;
