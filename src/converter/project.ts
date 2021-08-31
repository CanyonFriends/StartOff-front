import { ProjectClientType } from '../@types/client';
import { ProjectServerResponseType, ProjectServerRequestType } from '../@types/server';
import { skillServerType2ClientType } from './skill';
import { dateToString } from '../utils/date';

export const projectServerType2ClientType = (project: ProjectServerResponseType): ProjectClientType => {
  return {
    title: project.title,
    content: project.content,
    deployUrl: project.deploy_url,
    startDate: new Date(project.start_date),
    endDate: new Date(project.end_date),
    githubUrl: project.github_url,
    id: project.id,
    introduce: project.introduce,
    projectSklls: project.project_skills.map((skill) => skillServerType2ClientType(skill)),
  };
};

export const projectClientType2ServerReqeustType = (project: ProjectClientType): ProjectServerRequestType => {
  return {
    title: project.title,
    content: project.content,
    deploy_url: project.deployUrl,
    github_url: project.githubUrl,
    end_date: dateToString(project.endDate),
    start_date: dateToString(project.startDate),
    introduce: project.introduce,
    project_skills: project.projectSklls.map((skill) => skill.skillName),
  };
};
