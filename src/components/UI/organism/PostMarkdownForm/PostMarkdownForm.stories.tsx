import React, { useState } from 'react';
import CreatePostForm from '.';

export default {
  title: 'Organism/PostMarkdownForm',
  component: CreatePostForm,
};

export const createPostForm = (): React.ReactElement => {
  const [markdown, setMarkdown] = useState('');
  return <CreatePostForm markdown={markdown} handleChangeMarkdownText={setMarkdown} />;
};
