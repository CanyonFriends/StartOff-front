import React from 'react';
import { withKnobs, text, color } from '@storybook/addon-knobs';
import Label from '.';
import StyleWrapper from '../../../../common/styleWrapper';
import theme from '../../../../common/theme';

export default {
  title: 'Atom/Label',
  component: Label,
  decorators: [withKnobs],
};

export const sizeLabel = (): React.ReactElement => {
  const label = text('TAG', 'typescript');
  const textColor = color('COLOR', theme.color.color_primary_400);

  return (
    <StyleWrapper>
      <div>
        <div className="description">Small</div>
        <Label size="small" color={textColor} content={label} />
      </div>
      <div>
        <div className="description">Medium</div>
        <Label size="medium" color={textColor} content={label} />
      </div>
      <div>
        <div className="description">Large</div>
        <Label size="large" color={textColor} content={label} />
      </div>
      <div>
        <div className="description">Large</div>
        <Label size="extraLarge" color={textColor} content={label} />
      </div>
    </StyleWrapper>
  );
};
