import { ProfileServerType, ProjectServerResponseType, SkillServerType } from '../@types/server';
import generateUUID from '../utils/generateUUID';

export const makeSkillMock = ({
  skill_id = generateUUID(),
  skill_name = 'typescript',
  color = '#eeeeee',
  text_color = '#000000',
}): SkillServerType => {
  return {
    skill_id,
    skill_name,
    color,
    text_color,
  };
};

export const makeProjectResponseMock = ({
  id = Math.floor(Math.random() * 10000),
  title = 'title',
  content = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
  deploy_url = 'https://shellboylog.com/list',
  github_url = 'https://github.com/qkrdmstlr3/devlog',
  introduce = 'introduce introduce introduce',
  start_date = '1998-01-22',
  end_date = '2021-01-22',
  project_skills = [makeSkillMock({ skill_name: 'typescript' }), makeSkillMock({ skill_name: 'javascript' })],
}): ProjectServerResponseType => {
  return {
    id,
    title,
    content,
    deploy_url,
    github_url,
    introduce,
    start_date,
    end_date,
    project_skills,
  };
};

export const makeProfileMock = ({
  baekjoon_id = 'shellboy',
  blog_url = 'https://shellboylog.com',
  github_url = 'https://github.com/qkrdmstlr3',
  introduce = 'hello my name is shellboy',
  nickname = 'shellboy',
  projects = [makeProjectResponseMock({}), makeProjectResponseMock({})],
  user_skills = [makeSkillMock({ skill_name: 'typescript' }), makeSkillMock({ skill_name: 'javascript' })],
}): ProfileServerType => {
  return {
    baekjoon_id,
    blog_url,
    github_url,
    introduce,
    nickname,
    projects,
    user_skills,
  };
};
