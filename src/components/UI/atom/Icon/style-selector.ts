import { css, SerializedStyles } from '@emotion/react';
import { IconSizeType } from '../../@types/index';

export const iconSizeSelector: { [size in IconSizeType]: SerializedStyles } = {
  small: css`
    width: 1rem;
    height: 1rem;
  `,
  medium: css`
    width: 2rem;
    height: 2rem;
  `,
  large: css`
    width: 4rem;
    height: 4rem;
  `,
  extraLarge: css`
    width: 10rem;
    height: 10rem;
  `,
};
