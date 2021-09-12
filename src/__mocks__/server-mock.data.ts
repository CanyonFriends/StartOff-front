import {
  ProfileServerType,
  ProjectServerResponseType,
  SkillServerType,
  SummarizedPostServerType,
  BoardServerType,
  PostServerType,
  CommentServerType,
  IsDeleted,
} from '../@types/server';
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

export const makeMockSummarizedPost = ({
  post_id = Math.floor(Math.random() * 10000),
  title = 'title',
  current_people = 5,
  max_people = 10,
  created_at = '1998-01-22',
  nickname = 'user',
  post_skills = [makeSkillMock({ skill_name: 'typescript' }), makeSkillMock({ skill_name: 'c#' })],
}): SummarizedPostServerType => {
  return {
    post_id,
    title,
    current_people,
    max_people,
    created_at,
    post_skills,
    nickname,
  };
};

export const makeBoardMock = ({
  content = [makeMockSummarizedPost({})],
  totalElements = 1,
  totalPages = 1,
}): BoardServerType => {
  return {
    content,
    totalElements,
    totalPages,
  };
};

export const makeCommentMock = ({
  comment_id = Math.floor(Math.random() * 10000),
  content = 'content',
  created_at = '1998-01-22',
  is_deleted = IsDeleted.N,
  nickname = 'shellboy',
}): CommentServerType => {
  return {
    comment_id,
    content,
    created_at,
    is_deleted,
    nickname,
  };
};

export const makePostMock = ({
  post_id = Math.floor(Math.random() * 10000),
  user_id = Math.floor(Math.random() * 10000),
  category = 'category',
  title = 'title',
  content = 'content',
  created_at = '1998-01-22',
  current_people = 5,
  max_people = 10,
  nickname = 'shellboy',
  post_skills = [makeSkillMock({})],
  comments = [makeCommentMock({})],
}): PostServerType => {
  return {
    post_id,
    user_id,
    category,
    title,
    content,
    created_at,
    current_people,
    max_people,
    nickname,
    post_skills,
    comments,
  };
};
