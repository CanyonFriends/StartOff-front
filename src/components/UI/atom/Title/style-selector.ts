import { css, SerializedStyles } from '@emotion/react';
import { TitleSizeType } from '../../@types/index';

export const titleSizeSelector: { [size in TitleSizeType]: SerializedStyles } = {
  h1: css`
    font-size: 32px;
  `,
  h2: css`
    font-size: 24px;
  `,
  h3: css`
    font-size: 21.28px;
  `,
  h4: css`
    font-size: 18.72px;
  `,
  h5: css`
    font-size: 13.28px;
  `,
  h6: css`
    font-size: 10.72px;
  `,
};
