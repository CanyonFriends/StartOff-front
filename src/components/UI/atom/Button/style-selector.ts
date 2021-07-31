import { css, SerializedStyles } from '@emotion/react';
import theme from '../../../../common/theme';
import { ButtonThemeType, ButtonSizeType } from '../../@types/index';

export const buttonThemeSelector: { [theme in ButtonThemeType]: SerializedStyles } = {
  primary: css`
    color: ${theme.color.color_brightness_900};
    background-color: ${theme.color.color_primary_400};

    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 0.9;
    }
  `,
  secondary: css`
    color: ${theme.color.color_primary_400};
    background-color: ${theme.color.color_primary_300};

    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 0.9;
    }
  `,
};

export const buttonSizeSelector: { [size in ButtonSizeType]: SerializedStyles } = {
  small: css`
    height: 2.5rem;
    font-size: 1.2rem;
    padding: 0 0.7rem;
  `,
  medium: css`
    height: 3.5rem;
    font-size: 1.5rem;
    padding: 0 1rem;
  `,
  large: css`
    height: 4.6rem;
    font-size: 2rem;
    padding: 0 1.5rem;
  `,
  extraLarge: css`
    height: 5.6rem;
    font-size: 3rem;
    padding: 0 2rem;
  `,
};

export const iconOnlyTheme = css`
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.9;
  }
`;

export const iconOnlySizeSelector: { [size in ButtonSizeType]: SerializedStyles } = {
  small: css`
    height: 2.5rem;
    width: 2.5rem;
  `,
  medium: css`
    height: 3.5rem;
    width: 3.5rem;
  `,
  large: css`
    height: 4.6rem;
    width: 4.6rem;
  `,
  extraLarge: css`
    height: 5.6rem;
    width: 5.6rem;
  `,
};
