import { css, SerializedStyles } from '@emotion/react';
import { SizeType } from '../../@types/index';

// TODO: input의 셀렉터와 합치기
export const textareaSizeSelector: { [size in SizeType]: SerializedStyles } = {
  small: css`
    font-size: 1.5rem;
  `,
  medium: css`
    font-size: 1.8rem;
  `,
  large: css`
    font-size: 2.4rem;
  `,
  extraLarge: css`
    font-size: 3.2rem;
  `,
};
