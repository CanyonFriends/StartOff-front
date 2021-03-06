import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import SkillList from '.';
import { makeSkillMock } from '../../../../__mocks__/client-mock-data';

export default {
  title: 'Organism/SkillList',
  component: SkillList,
  decorators: [withKnobs],
};

const onClickAction = action('click');

const totalSkills = [
  makeSkillMock({ skillName: 'typescript' }),
  makeSkillMock({ skillName: 'javascript' }),
  makeSkillMock({ skillName: 'c#' }),
  makeSkillMock({ skillName: 'python' }),
];

const mySkills = totalSkills.slice(0, 2);

export const editable = (): React.ReactElement => {
  const title = text('TITLE', '주요기술');

  return (
    <SkillList
      editableAuthority
      clickTotalSkillItem={onClickAction}
      deleteMySkill={onClickAction}
      title={title}
      mySkillList={mySkills}
      totalSkillList={totalSkills}
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
      mySkillList={mySkills}
      totalSkillList={totalSkills}
    />
  );
};
