import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ProfileIntroduce from '.';
import { ModifyProfileIntroduceValidatorType } from '../../../../validator/modifyProfileIntroduceValidator';

export default {
  title: 'Organism/ProfileIntroduce',
  component: ProfileIntroduce,
  decorators: [withKnobs],
};

const onSubmitAction = action('form submitted');
const handleSubmit = async (_: ModifyProfileIntroduceValidatorType) => {
  onSubmitAction(_);
  return '';
};

export const canModify = (): React.ReactElement => {
  const nickname = text('NICKNAME', 'nickname');
  const introduce = text('introduce', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.');

  return (
    <ProfileIntroduce
      editableAuthority
      imageurl=""
      nickname={nickname}
      introduce={introduce}
      handleSubmit={handleSubmit}
    />
  );
};

export const cannotModify = (): React.ReactElement => {
  const nickname = text('NICKNAME', 'nickname');
  const introduce = text('introduce', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.');

  return (
    <ProfileIntroduce
      editableAuthority={false}
      imageurl=""
      nickname={nickname}
      introduce={introduce}
      handleSubmit={handleSubmit}
    />
  );
};
