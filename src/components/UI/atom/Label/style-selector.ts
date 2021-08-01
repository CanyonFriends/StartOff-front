import { css, SerializedStyles } from '@emotion/react';
import { LabelSizeType } from '../../@types/index';

export const labelSizeSelector: { [size in LabelSizeType]: SerializedStyles } = {
  small: css`
    font-size: 1.5rem;
  `,
  medium: css`
    font-size: 2.5rem;
  `,
  large: css`
    font-size: 3.5rem;
  `,
  extraLarge: css`
    font-size: 4rem;
  `,
};
