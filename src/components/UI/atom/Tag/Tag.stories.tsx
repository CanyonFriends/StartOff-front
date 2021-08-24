import React from 'react';
import { withKnobs, text, color } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Tag from '.';
import StyleWrapper from '../../../../common/styleWrapper';
import theme from '../../../../common/theme';

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
        <Tag skillId="1" skillName={label} />
      </div>
      <div>
        <div className="description">primary color</div>
        <Tag skillId="1" color={backgroundColor} skillName={label} />
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
        <Tag skillId="1" onClickClose={onClickAction} skillName={label} />
      </div>
      <div>
        <div className="description">primary color</div>
        <Tag skillId="1" onClickClose={onClickAction} color={backgroundColor} skillName={label} />
      </div>
    </StyleWrapper>
  );
};
