import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ProfileInfoCard from '.';
import { ModifyProfileInfoCardType } from '../../../../validator/modifyProfileInfoCard';

export default {
  title: 'Organism/ProfileInfoCard',
  component: ProfileInfoCard,
  decorators: [withKnobs],
};

const onSubmitAction = action('form submitted');
const handleSubmit = async (_: ModifyProfileInfoCardType) => {
  onSubmitAction(_);
  return '';
};

export const profileInfoCard = (): React.ReactElement => {
  const textValue = text('GITHUB', 'https://github.com/qkrdmstlr3');

  return <ProfileInfoCard title="Github" iconType="Logo" textValue={textValue} handleSubmit={handleSubmit} />;
};
