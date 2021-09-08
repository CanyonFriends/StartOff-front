import React from 'react';
import { makeSkillMock } from '../../__mocks__/client-mock-data';
import CreatePostTemplate from './template';

export default {
  title: 'Template/CreatePost',
  component: CreatePostTemplate,
};

const totalSkillList = [
  makeSkillMock({ skillName: 'typescript' }),
  makeSkillMock({ skillName: 'javascript' }),
  makeSkillMock({ skillName: 'python' }),
];
export const createPostTemplate = (): React.ReactElement => (
  <CreatePostTemplate totalSkillList={totalSkillList} board="board" userId="1" />
);
