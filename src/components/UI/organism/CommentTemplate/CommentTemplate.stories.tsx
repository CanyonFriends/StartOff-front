import React from 'react';
import { action } from '@storybook/addon-actions';
import CommentTemplate from '.';
import { makeCommentMock } from '../../../../__mocks__/client-mock-data';

export default {
  title: 'Organism/CommentTemplate',
  component: CommentTemplate,
};

const commentMock = makeCommentMock({});
const clickAction = action('onClick');

export const editable = (): React.ReactElement => (
  <CommentTemplate editableAuthority comment={commentMock} handleDelete={clickAction} />
);

export const uneditable = (): React.ReactElement => (
  <CommentTemplate editableAuthority={false} comment={commentMock} handleDelete={clickAction} />
);
