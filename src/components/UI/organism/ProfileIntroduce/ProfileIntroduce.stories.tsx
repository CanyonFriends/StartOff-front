import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ProfileIntroduce from '.';
import StyleWrapper from '../../../../style/styleWrapper';
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
    <StyleWrapper>
      <div>
        <div className="description">intial</div>
        <ProfileIntroduce
          editableAuthority
          isEditable={false}
          imageurl=""
          nickname={nickname}
          introduce={introduce}
          handleSubmit={handleSubmit}
        />
      </div>
      <div>
        <div className="description">editable</div>
        <ProfileIntroduce
          editableAuthority
          isEditable
          imageurl=""
          nickname={nickname}
          introduce={introduce}
          handleSubmit={handleSubmit}
        />
      </div>
    </StyleWrapper>
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
