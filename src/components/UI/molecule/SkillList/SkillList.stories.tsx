import React from 'react';
import { action } from '@storybook/addon-actions';
import SkillList from '.';
import { makeSkillMock } from '../../../../__mocks__/client-mock-data';

export default {
  title: 'Molecule/SkillList',
  component: SkillList,
};

const totalSkills = [
  makeSkillMock({ skillName: 'typescript' }),
  makeSkillMock({ skillName: 'javascript' }),
  makeSkillMock({ skillName: 'c#' }),
  makeSkillMock({ skillName: 'python' }),
];
const onClickAction = action('click');

export const skillList = (): React.ReactElement => {
  return <SkillList skillList={totalSkills} handleClickSkill={onClickAction} />;
};
