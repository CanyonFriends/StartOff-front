import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import SkillList from '.';
import { skills } from '../../../../__test__/mock-dats';

export default {
  title: 'Organism/SkillList',
  component: SkillList,
  decorators: [withKnobs],
};

const onClickAction = action('click');

export const editable = (): React.ReactElement => {
  const title = text('TITLE', '주요기술');

  return (
    <SkillList
      editableAuthority
      clickTotalSkillItem={onClickAction}
      deleteMySkill={onClickAction}
      title={title}
      mySkillList={skills}
      totalSkillList={skills}
    />
  );
};

export const uneditable = (): React.ReactElement => {
  const title = text('TITLE', '주요기술');

  return (
    <SkillList
      editableAuthority={false}
      deleteMySkill={onClickAction}
      clickTotalSkillItem={onClickAction}
      title={title}
      mySkillList={skills}
      totalSkillList={skills}
    />
  );
};
