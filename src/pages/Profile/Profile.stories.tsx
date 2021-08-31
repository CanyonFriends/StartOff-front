import React from 'react';
import ProfileTemplate from './template';
import { skills, project } from '../../__mocks__/mock-dats';

export default {
  title: 'Template/Profile',
  component: ProfileTemplate,
};

export const editableProfile = (): React.ReactElement => {
  const userId = '1';
  const github = 'https://github.com/qkrdmstlr3';
  const blog = 'https://shellboylog.com';
  return (
    <ProfileTemplate
      userId={userId}
      editableAuthority
      github={github}
      blog={blog}
      nickname="nickname"
      introduce="introduce"
      imageUrl=""
      mySkillList={skills}
      totalSkillList={skills}
      projects={[project]}
    />
  );
};

export const uneditableProfile = (): React.ReactElement => {
  const userId = '1';
  const github = 'https://github.com/qkrdmstlr3';
  const blog = 'https://shellboylog.com';

  return (
    <ProfileTemplate
      userId={userId}
      editableAuthority={false}
      github={github}
      blog={blog}
      nickname="nickname"
      introduce="introduce"
      imageUrl=""
      mySkillList={skills}
      totalSkillList={skills}
      projects={[]}
    />
  );
};
