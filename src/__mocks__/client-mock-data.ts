import { ErrorType } from '../api/error';
import { SigninResponseType } from '../api/auth';
import {
  SkillClientType,
  ProjectClientType,
  ProfileClientType,
  SummarizedPostClientType,
  BoardClientType,
  CreatePostClientType,
  PostClientType,
} from '../@types/client';
import generateUUID from '../utils/generateUUID';

// api
export const makeSigninSuccessInfoMock = ({
  access_token = 'access_token',
  uuid = 'uuid',
  email = 'email@email.com',
  nickname = 'nickname',
  user_id = '1',
}): SigninResponseType => {
  return {
    access_token,
    uuid,
    email,
    nickname,
    user_id,
  };
};

// error
export const makeErrorMock = ({ error_msg = '에러 발생' }): ErrorType => {
  return { error_msg };
};

// data
export const makeSkillMock = ({
  skillId = generateUUID(),
  skillName = 'c#',
  color = '#eeeeee',
  textColor = '#000000',
}): SkillClientType => {
  return {
    skillId,
    skillName,
    color,
    textColor,
  };
};

export const makeProjectMock = ({
  id = Math.floor(Math.random() * 10000),
  title = 'project',
  deployUrl = 'https://shellboylog.com/list',
  githubUrl = 'https://github.com/qkrdmstlr3/devlog',
  introduce = 'introduce introduce introduce',
  startDate = new Date('1998-01-22'),
  endDate = new Date('2021-01-22'),
  content = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
  projectSklls = [makeSkillMock({ skillName: 'typescript' }), makeSkillMock({ skillName: 'c#' })],
}): ProjectClientType => {
  return {
    id,
    title,
    deployUrl,
    githubUrl,
    introduce,
    startDate,
    endDate,
    content,
    projectSklls,
  };
};

export const makeProfileMock = ({
  baekjoonId = 'shellboy',
  blogUrl = 'https://shellboylog.com',
  githubUrl = 'https://github.com/qkrdmstlr3',
  introduce = 'hello my name is shellboy',
  nickname = 'shellboy',
  projects = [makeProjectMock({})],
  userSkills = [makeSkillMock({ skillName: 'typescript' }), makeSkillMock({ skillName: 'c#' })],
}): ProfileClientType => {
  return {
    baekjoonId,
    blogUrl,
    githubUrl,
    introduce,
    nickname,
    projects,
    userSkills,
  };
};

export const makeMockSummarizedPost = ({
  postId = generateUUID(),
  title = 'title',
  currentPeople = 5,
  maxPeople = 10,
  createAt = new Date(),
  nickname = 'user',
  postSkills = [makeSkillMock({ skillName: 'typescript' }), makeSkillMock({ skillName: 'c#' })],
}): SummarizedPostClientType => {
  return {
    postId,
    title,
    currentPeople,
    maxPeople,
    createAt,
    postSkills,
    nickname,
  };
};

export const makeMockBoard = ({
  content = [makeMockSummarizedPost({})],
  totalElements = 1,
  totalPages = 1,
}): BoardClientType => {
  return {
    content,
    totalElements,
    totalPages,
  };
};

export const makeCreatePost = ({
  category = 'category',
  content = 'content',
  currentPeople = 5,
  maxPeople = 10,
  postSkills = [makeSkillMock({})],
  title = 'title',
  userId = '1',
}): CreatePostClientType => {
  return {
    category,
    content,
    currentPeople,
    maxPeople,
    postSkills,
    title,
    userId,
  };
};

export const makePostMock = ({
  postId = generateUUID(),
  category = 'category',
  title = 'title',
  content = 'content',
  createdAt = new Date('1998-01-22'),
  currentPeople = 5,
  maxPeople = 10,
  nickname = 'shellboy',
  postSkills = [makeSkillMock({})],
}): PostClientType => {
  return {
    postId,
    category,
    title,
    content,
    createdAt,
    currentPeople,
    maxPeople,
    nickname,
    postSkills,
  };
};

export const mockString =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
