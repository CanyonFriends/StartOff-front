import { ErrorType } from '../api/error';
import { SigninResponseType, SignupResponseType } from '../api/auth';

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
