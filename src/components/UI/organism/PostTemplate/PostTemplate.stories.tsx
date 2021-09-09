import { action } from '@storybook/addon-actions';
import React from 'react';
import PostTemplate from '.';
import { makeSkillMock } from '../../../../__mocks__/client-mock-data';

export default {
  title: 'Organism/PostTemplate',
  component: PostTemplate,
};

const clickAction = action('on click');

export const editable = () => (
  <PostTemplate
    editableAuthority
    title="title"
    content="# content"
    currentPeople={5}
    maxPeople={10}
    postSkills={[makeSkillMock({})]}
    nickname="shellboy"
    handleModifyPost={clickAction}
    handleDeletePost={clickAction}
  />
);

export const unEditable = () => (
  <PostTemplate
    editableAuthority={false}
    title="title"
    content="# content"
    currentPeople={5}
    maxPeople={10}
    postSkills={[makeSkillMock({})]}
    nickname="shellboy"
    handleModifyPost={clickAction}
    handleDeletePost={clickAction}
  />
);
