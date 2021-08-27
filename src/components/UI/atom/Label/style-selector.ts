import { css, SerializedStyles } from '@emotion/react';
import { SizeType } from '../../@types/index';

export const labelSizeSelector: { [size in SizeType]: SerializedStyles } = {
  small: css`
    font-size: 1.5rem;
  `,
  medium: css`
    font-size: 1.8rem;
  `,
  large: css`
    font-size: 2.1rem;
  `,
  extraLarge: css`
    font-size: 2.5rem;
  `,
};
