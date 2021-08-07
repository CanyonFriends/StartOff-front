import { css, SerializedStyles } from '@emotion/react';
import { AnchorSizeType } from '../../@types/index';

export const anchorSizeSelector: { [size in AnchorSizeType]: SerializedStyles } = {
  small: css`
    font-size: 1.6rem;
  `,
  medium: css`
    font-size: 2rem;
  `,
  large: css`
    font-size: 3rem;
  `,
  extraLarge: css`
    font-size: 4rem;
  `,
};
