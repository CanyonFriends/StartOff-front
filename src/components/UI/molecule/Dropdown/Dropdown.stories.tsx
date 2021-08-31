import React from 'react';
import { action } from '@storybook/addon-actions';
import SkillDropdown from '.';
import { makeSkillMock } from '../../../../__mocks__/client-mock-data';

export default {
  title: 'Molecule/Dropdown',
  component: SkillDropdown,
};

const onClickAction = action('click');

export const dropdown = (): React.ReactElement => {
  const placeholder = '스택 추가';
  const skills = [
    makeSkillMock({ skillName: 'typescript' }),
    makeSkillMock({ skillName: 'javascript' }),
    makeSkillMock({ skillName: 'c#' }),
    makeSkillMock({ skillName: 'python' }),
  ];
  return (
    <SkillDropdown
      placeholder={placeholder}
      items={skills.map((skill) => ({ id: skill.skillId, text: skill.skillName }))}
      clickItem={onClickAction}
    />
  );
};
