import { css, SerializedStyles } from '@emotion/react';
import { TitleSizeType } from '../../@types/index';

export const titleSizeSelector: { [size in TitleSizeType]: SerializedStyles } = {
  h1: css`
    font-size: 4rem;
  `,
  h2: css`
    font-size: 3.2rem;
  `,
  h3: css`
    font-size: 2.1rem;
  `,
  h4: css`
    font-size: 1.8rem;
  `,
  h5: css`
    font-size: 1.5rem;
  `,
  h6: css`
    font-size: 1.2rem;
  `,
};
