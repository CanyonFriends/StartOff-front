import React from 'react';
import ProfileTemplate from '.';
import { makeSkillMock, makeProjectMock } from '../../../__mocks__/client-mock-data';

export default {
  title: 'Template/Profile',
  component: ProfileTemplate,
};

const totalSkills = [
  makeSkillMock({ skillName: 'typescript' }),
  makeSkillMock({ skillName: 'javascript' }),
  makeSkillMock({ skillName: 'c#' }),
  makeSkillMock({ skillName: 'python' }),
];

const mySkills = totalSkills.slice(0, 2);

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
      mySkillList={mySkills}
      totalSkillList={totalSkills}
      projects={[makeProjectMock({}), makeProjectMock({})]}
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
      mySkillList={mySkills}
      totalSkillList={totalSkills}
      projects={[]}
    />
  );
};
