import styled from '@emotion/styled';
import theme from '../../../../style/theme';

interface TagStyleProps {
  color: string;
  textColor: string;
  availableClose: boolean;
}

export const Container = styled.span<TagStyleProps>`
  padding: 0.2rem 1rem;

  font-size: 1.5rem;
  border-radius: 0.25rem;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.color};
`;

export const CloseButton = styled.span`
  margin-left: 12px;
  color: ${theme.color.color_brightness_600};
  cursor: pointer;
`;
