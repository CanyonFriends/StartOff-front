import React from 'react';
import { action } from '@storybook/addon-actions';
import { makeSkillMock } from '../../../__mocks__/client-mock-data';
import CreatePostTemplate from '../template';

export default {
  title: 'Template/CreatePost',
  component: CreatePostTemplate,
};

const totalSkillList = [
  makeSkillMock({ skillName: 'typescript' }),
  makeSkillMock({ skillName: 'javascript' }),
  makeSkillMock({ skillName: 'python' }),
];

const changeAction = action('onChange');
const changeAsyncAction = async () => {
  changeAction();
  return '';
};
export const createPostTemplate = (): React.ReactElement => (
  <CreatePostTemplate totalSkillList={totalSkillList} handleSubmit={changeAsyncAction} />
);
