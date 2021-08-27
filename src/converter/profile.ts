import { ProfileType } from '../@types/client';
import { GetProfileResponse } from '../api/profile';
import { projectServerType2ClientType } from './project';
import { skillServerType2ClientType } from './skill';

export const profileResponse2Type = (profileResponse: GetProfileResponse): ProfileType => {
  return {
    baekjoonId: profileResponse.baekjoon_id,
    blogUrl: profileResponse.blog_url,
    githubUrl: profileResponse.github_url,
    introduce: profileResponse.introduce,
    nickname: profileResponse.nickname,
    projects: profileResponse.projects.map((project) => projectServerType2ClientType(project)),
    userSkills: profileResponse.user_skills.map((skill) => skillServerType2ClientType(skill)),
  };
};
