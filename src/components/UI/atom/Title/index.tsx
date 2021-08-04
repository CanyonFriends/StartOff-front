import React from 'react';
import { StyledComponent } from '@emotion/styled';
import * as Style from './styled';
import theme from '../../../../common/theme';
import { TitleSizeType } from '../../@types/index';

interface TitleProps {
  children: React.ReactNode;
  color?: string;
  fontsize?: TitleSizeType;
}

type TitleStyleType = StyledComponent<{ color: string; fontsize: TitleSizeType }>;

const titleDispenser: { [title in TitleSizeType]: TitleStyleType } = {
  h1: Style.Title1,
  h2: Style.Title2,
  h3: Style.Title3,
  h4: Style.Title4,
  h5: Style.Title5,
  h6: Style.Title6,
};

function Title({ children, color = theme.color.color_brightness_000, fontsize = 'h1' }: TitleProps) {
  const TitleComponent = titleDispenser[fontsize];
  return (
    <TitleComponent color={color} fontsize={fontsize}>
      {children}
    </TitleComponent>
  );
}

export default Title;
