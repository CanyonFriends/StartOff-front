import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ProfileTagCard from '.';
import { tags } from '../../../../__test__/mock-dats';

export default {
  title: 'Organism/ProfileTagCard',
  component: ProfileTagCard,
  decorators: [withKnobs],
};

const onClickAction = action('click');

export const editable = (): React.ReactElement => {
  const title = text('TITLE', '주요기술');

  return <ProfileTagCard editableAuthority clickTagItem={onClickAction} title={title} tagContents={tags} />;
};

export const uneditable = (): React.ReactElement => {
  const title = text('TITLE', '주요기술');

  return <ProfileTagCard editableAuthority={false} clickTagItem={onClickAction} title={title} tagContents={tags} />;
};
