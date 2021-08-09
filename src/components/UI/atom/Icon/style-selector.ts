import { css, SerializedStyles } from '@emotion/react';
import { SizeType } from '../../@types/index';

export const iconSizeSelector: { [size in SizeType]: SerializedStyles } = {
  small: css`
    width: 3rem;
    height: 3rem;
  `,
  medium: css`
    width: 4rem;
    height: 4rem;
  `,
  large: css`
    width: 6rem;
    height: 6rem;
  `,
  extraLarge: css`
    width: 10rem;
    height: 10rem;
  `,
};
