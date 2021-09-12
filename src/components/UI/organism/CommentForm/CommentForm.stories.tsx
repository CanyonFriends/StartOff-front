import { action } from '@storybook/addon-actions';
import React from 'react';
import CommentForm from '.';

export default {
  title: 'Organism/CommentForm',
  component: CommentForm,
};

const submitAction = action('submit');
const submitAsyncAction = async () => {
  submitAction();
  return '';
};
export const commentForm = (): React.ReactElement => {
  return <CommentForm handleSubmit={submitAsyncAction} />;
};
