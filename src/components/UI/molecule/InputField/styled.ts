import styled from '@emotion/styled';
import { SortDirectionType } from '../../@types/index';

interface ContainerStyleProps {
  sortDirection: SortDirectionType;
}

export const Container = styled.div<ContainerStyleProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${(props) => props.sortDirection};
  justify-content: space-between;
  align-items: flex-start;
`;
