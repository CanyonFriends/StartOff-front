import styled from '@emotion/styled';
import { SortDirectionType } from '../../@types/index';

interface ContainerStyle {
  sortDirection: SortDirectionType;
  isContinuous: boolean;
}

export const Container = styled.div<ContainerStyle>`
  display: flex;
  flex-direction: ${(props) => props.sortDirection};
  justify-content: ${(props) => !props.isContinuous && 'space-between'};
  align-items: center;
`;
