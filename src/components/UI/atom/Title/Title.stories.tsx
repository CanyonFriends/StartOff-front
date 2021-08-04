import React from 'react';
import { withKnobs, text, color } from '@storybook/addon-knobs';
import StyleWrapper from '../../../../common/styleWrapper';
import theme from '../../../../common/theme';
import Title from '.';

export default {
  title: 'Atom/Title',
  component: Title,
  decorators: [withKnobs],
};

export const sizeTitle = (): React.ReactElement => {
  const title = text('TAG', 'typescript');
  const textColor = color('COLOR', theme.color.color_primary_400);

  return (
    <StyleWrapper>
      <div>
        <div className="description">h1</div>
        <Title fontsize="h1" color={textColor}>
          {title}
        </Title>
      </div>
      <div>
        <div className="description">h2</div>
        <Title fontsize="h2" color={textColor}>
          {title}
        </Title>
      </div>
      <div>
        <div className="description">h3</div>
        <Title fontsize="h3" color={textColor}>
          {title}
        </Title>
      </div>
      <div>
        <div className="description">h4</div>
        <Title fontsize="h4" color={textColor}>
          {title}
        </Title>
      </div>
      <div>
        <div className="description">h5</div>
        <Title fontsize="h5" color={textColor}>
          {title}
        </Title>
      </div>
      <div>
        <div className="description">h6</div>
        <Title fontsize="h6" color={textColor}>
          {title}
        </Title>
      </div>
    </StyleWrapper>
  );
};
