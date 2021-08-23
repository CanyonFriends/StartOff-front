import React from 'react';
import ProfileTemplate from './template';
import { tags } from '../../__test__/mock-dats';

export default {
  title: 'Template/Profile',
  component: ProfileTemplate,
};

export const editableProfile = (): React.ReactElement => {
  const github = 'https://github.com/qkrdmstlr3';
  const blog = 'https://shellboylog.com';
  return (
    <ProfileTemplate
      editableAuthority
      github={github}
      blog={blog}
      nickname="nickname"
      introduce="introduce"
      imageUrl=""
      tagContents={tags}
    />
  );
};

export const uneditableProfile = (): React.ReactElement => {
  const github = 'https://github.com/qkrdmstlr3';
  const blog = 'https://shellboylog.com';

  return (
    <ProfileTemplate
      editableAuthority={false}
      github={github}
      blog={blog}
      nickname="nickname"
      introduce="introduce"
      imageUrl=""
      tagContents={tags}
    />
  );
};
