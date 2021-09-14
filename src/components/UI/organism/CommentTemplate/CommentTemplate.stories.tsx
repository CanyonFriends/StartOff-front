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
const clickAsyncAction = async () => {
  clickAction();
  return '';
};

export const editable = (): React.ReactElement => (
  <CommentTemplate
    editableAuthority
    comment={commentMock}
    handleDelete={clickAction}
    handleSubmitModify={clickAsyncAction}
  />
);

export const uneditable = (): React.ReactElement => (
  <CommentTemplate
    editableAuthority={false}
    comment={commentMock}
    handleDelete={clickAction}
    handleSubmitModify={clickAsyncAction}
  />
);
