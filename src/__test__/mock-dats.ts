import { ErrorType } from '../api/error';
import { SigninResponseType, SignupResponseType } from '../api/auth';
import { SkillType, ProjectType, ProfileType, SummarizedPostType } from '../@types/client';
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

export const skills: SkillType[] = [
  {
    skillId: '1',
    skillName: 'typescript',
    color: '#eeeeee',
    textColor: '#000000',
  },
  {
    skillId: '2',
    skillName: 'python',
    color: '#eeeeee',
    textColor: '#000000',
  },
  {
    skillId: '3',
    skillName: 'c',
    color: '#eeeeee',
    textColor: '#000000',
  },
  {
    skillId: '4',
    skillName: 'c#',
    color: '#eeeeee',
    textColor: '#000000',
  },
];

export const project: ProjectType = {
  id: 1,
  title: 'project',
  deployUrl: 'https://shellboylog.com/list',
  githubUrl: 'https://github.com/qkrdmstlr3/devlog',
  introduce: 'introduce introduce introduce',
  startDate: new Date('1998-01-22'),
  endDate: new Date('2021-01-22'),
  content:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
  projectSklls: skills.slice(0, 1),
};

export const profile: ProfileType = {
  baekjoonId: 'shellboy',
  blogUrl: 'https://shellboylog.com',
  githubUrl: 'https://github.com/qkrdmstlr3',
  introduce: 'hello my name is shellboy',
  nickname: 'shellboy',
  projects: [project],
  userSkills: skills.slice(2),
};

export const makeMockSummarizedPost = ({
  postId = generateUUID(),
  title = 'title',
  currentPeople = 5,
  maxPeople = 10,
  nickname = 'user',
  postSkills = skills,
}): SummarizedPostType => {
  return {
    postId,
    title,
    currentPeople,
    maxPeople,
    postSkills,
    user: { nickname },
  };
};
