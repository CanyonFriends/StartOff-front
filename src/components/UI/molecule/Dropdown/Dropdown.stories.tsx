import React from 'react';
import { action } from '@storybook/addon-actions';
import SkillDropdown from '.';
import { skills } from '../../../../__test__/mock-dats';

export default {
  title: 'Molecule/Dropdown',
  component: SkillDropdown,
};

const onClickAction = action('click');

export const dropdown = (): React.ReactElement => {
  const placeholder = '스택 추가';
  return (
    <SkillDropdown
      placeholder={placeholder}
      items={skills.map((skill) => ({ id: skill.skillId, text: skill.skillName }))}
      clickItem={onClickAction}
    />
  );
};
