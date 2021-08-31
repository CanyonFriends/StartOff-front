import React from 'react';
import { withKnobs, text, color } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Tag from '.';
import StyleWrapper from '../../../../style/styleWrapper';
import theme from '../../../../style/theme';

export default {
  title: 'Atom/Tag',
  component: Tag,
  decorators: [withKnobs],
};

const onClickAction = action('click');

export const unavailableCloseTag = (): React.ReactElement => {
  const label = text('TAG', 'typescript');
  const backgroundColor = color('BACKGROUND COLOR', theme.color.color_primary_300);

  return (
    <StyleWrapper>
      <div>
        <div className="description">no color</div>
        <Tag id="1" name={label} />
      </div>
      <div>
        <div className="description">primary color</div>
        <Tag id="1" color={backgroundColor} name={label} />
      </div>
    </StyleWrapper>
  );
};

export const availableCloseTag = (): React.ReactElement => {
  const label = text('TAG', 'typescript');
  const backgroundColor = color('BACKGROUND COLOR', theme.color.color_primary_300);

  return (
    <StyleWrapper>
      <div>
        <div className="description">no color</div>
        <Tag id="1" onClickClose={onClickAction} name={label} />
      </div>
      <div>
        <div className="description">primary color</div>
        <Tag id="1" onClickClose={onClickAction} color={backgroundColor} name={label} />
      </div>
    </StyleWrapper>
  );
};
