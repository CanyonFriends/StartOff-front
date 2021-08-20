import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import ProfileTagCard from '.';
import { tags } from '../../../../__test__/mock-dats';

export default {
  title: 'Organism/ProfileTagCard',
  component: ProfileTagCard,
  decorators: [withKnobs],
};

export const editable = (): React.ReactElement => {
  const title = text('TITLE', '주요기술');

  return <ProfileTagCard editableAuthority title={title} tagContent={tags} />;
};

export const uneditable = (): React.ReactElement => {
  const title = text('TITLE', '주요기술');

  return <ProfileTagCard editableAuthority={false} title={title} tagContent={tags} />;
};
