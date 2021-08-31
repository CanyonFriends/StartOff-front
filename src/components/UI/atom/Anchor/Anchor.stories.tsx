import React from 'react';
import { withKnobs, text, color } from '@storybook/addon-knobs';
import Anchor from '.';
import StyleWrapper from '../../../../style/styleWrapper';
import theme from '../../../../style/theme';

export default {
  title: 'Atom/Anchor',
  component: Anchor,
  decorators: [withKnobs],
};

const homePath = '/';

export const anchorSize = (): React.ReactElement => {
  const anchorText = text('ANCHOR', 'anchor');
  return (
    <StyleWrapper>
      <div>
        <div className="description">small</div>
        <Anchor to={homePath} size="small">
          {anchorText}
        </Anchor>
      </div>
      <div>
        <div className="description">medium</div>
        <Anchor to={homePath} size="medium">
          {anchorText}
        </Anchor>
      </div>
      <div>
        <div className="description">large</div>
        <Anchor to={homePath} size="large">
          {anchorText}
        </Anchor>
      </div>
      <div>
        <div className="description">extraLarge</div>
        <Anchor to={homePath} size="extraLarge">
          {anchorText}
        </Anchor>
      </div>
    </StyleWrapper>
  );
};

export const anchorBolder = (): React.ReactElement => {
  const anchorText = text('ANCHOR', 'anchor');
  return (
    <StyleWrapper>
      <div>
        <div className="description">normal</div>
        <Anchor to={homePath} size="large">
          {anchorText}
        </Anchor>
      </div>
      <div>
        <div className="description">bolder</div>
        <Anchor to={homePath} size="large" bolder>
          {anchorText}
        </Anchor>
      </div>
    </StyleWrapper>
  );
};

export const anchorColor = (): React.ReactElement => {
  const anchorText = text('ANCHOR', 'anchor');
  const textColor = color('TEXTCOLOR', theme.color.color_brightness_500);
  const hoverColor = color('HOVERCOLOR', theme.color.color_primary_300);

  return (
    <StyleWrapper>
      <div>
        <div className="description">color</div>
        <Anchor to={homePath} size="large" color={textColor} hoverColor={hoverColor}>
          {anchorText}
        </Anchor>
      </div>
    </StyleWrapper>
  );
};
