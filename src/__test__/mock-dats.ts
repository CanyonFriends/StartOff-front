import { ErrorType } from '../api/error';
import { SigninResponseType, SignupResponseType } from '../api/auth';
import { SkillType } from '../@types/client';

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
