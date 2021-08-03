import React from 'react';
import * as Style from './styled';
import theme from '../../../../common/theme';
import { TitleSizeType } from '../../@types/index';

interface TitleProps {
  children: React.ReactNode;
  color?: string;
  fontsize?: TitleSizeType;
}

function Title({ children, color = theme.color.color_brightness_000, fontsize = 'h1' }: TitleProps) {
  return (
    // <Style.Title color={color} fontsize={fontsize}>
    //   {children}
    // </Style.Title>
    <div>
      {(() => {
        switch (fontsize) {
          case 'h1':
            return (
              <Style.Title1 color={color} fontsize={fontsize}>
                {children}
              </Style.Title1>
            );
          case 'h2':
            return (
              <Style.Title2 color={color} fontsize={fontsize}>
                {children}
              </Style.Title2>
            );
          case 'h3':
            return (
              <Style.Title3 color={color} fontsize={fontsize}>
                {children}
              </Style.Title3>
            );
          case 'h4':
            return (
              <Style.Title4 color={color} fontsize={fontsize}>
                {children}
              </Style.Title4>
            );
          case 'h5':
            return (
              <Style.Title5 color={color} fontsize={fontsize}>
                {children}
              </Style.Title5>
            );
          case 'h6':
            return (
              <Style.Title6 color={color} fontsize={fontsize}>
                {children}
              </Style.Title6>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default Title;
