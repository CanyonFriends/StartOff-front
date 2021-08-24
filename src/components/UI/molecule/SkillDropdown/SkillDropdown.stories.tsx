import React from 'react';
import { action } from '@storybook/addon-actions';
import SkillDropdown from '.';
import { skills } from '../../../../__test__/mock-dats';

export default {
  title: 'Molecule/SkillDropdown',
  component: SkillDropdown,
};

const onClickAction = action('click');

export const skilldropdown = (): React.ReactElement => {
  const placeholder = '스택 추가';
  return <SkillDropdown placeholder={placeholder} skills={skills} clickItem={onClickAction} />;
};
