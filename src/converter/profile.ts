import { ProfileType, ProjectType } from '../@types/client';
import { ProjectServerType } from '../@types/server';
import { GetProfileResponse } from '../api/profile';
import { skillServerType2ClientType } from './skill';

export const projectServerType2ClientType = (project: ProjectServerType): ProjectType => {
  return {
    content: project.content,
    deployUrl: project.deploy_url,
    endDate: project.end_date,
    githubUrl: project.github_url,
    id: project.id,
    introduce: project.introduce,
    projectSklls: project.project_skills.map((skill) => skillServerType2ClientType(skill)),
  };
};

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
