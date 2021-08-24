import React from 'react';
import { action } from '@storybook/addon-actions';
import TagDropdown from '.';

export default {
  title: 'Molecule/TagDropdown',
  component: TagDropdown,
};

const onClickAction = action('click');
const tags = [
  { id: '1', content: 'javascript' },
  { id: '2', content: 'typescript' },
  { id: '3', content: 'c++' },
  { id: '4', content: 'python' },
];

export const tagdropdown = (): React.ReactElement => {
  const placeholder = '스택 추가';
  return <TagDropdown placeholder={placeholder} tags={tags} clickItem={onClickAction} />;
};
