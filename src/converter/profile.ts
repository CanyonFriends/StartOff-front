import { ProfileType, ProjectType, SkillType } from '../@types/client';
import { ProjectServerType, SkillServerType } from '../@types/server';
import { GetProfileResponse } from '../api/profile';

export const skillServerType2ClientType = (skill: SkillServerType): SkillType => {
  return {
    skillId: String(skill.skill_id),
    color: skill.color,
    skillName: skill.skill_name,
    textColor: skill.text_color,
  };
};

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
