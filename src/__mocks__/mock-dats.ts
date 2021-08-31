import { ErrorType } from '../api/error';
import { SigninResponseType, SignupResponseType } from '../api/auth';
import { SkillClientType, ProjectClientType, ProfileClientType, SummarizedPostClientType } from '../@types/client';
import generateUUID from '../utils/generateUUID';

// api
export const signinSuccessMockInfo: SigninResponseType = {
  access_token: 'access_token',
  uuid: 'uuid',
  email: 'email@email.com',
  nickname: 'nickname',
  user_id: '1',
};

export const signinFailMockInfo: ErrorType = {
  error_msg: '에러 발생',
};

export const signupSuccessMockInfo: SignupResponseType = {
  user_id: '1',
};

export const signupFailMockInfo: ErrorType = {
  error_msg: '에러 발생',
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
  id = 1,
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
  projects = [makeProjectMock({ id: 1 }), makeProjectMock({ id: 2 }), makeProjectMock({ id: 3 })],
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
    user: { nickname },
  };
};
