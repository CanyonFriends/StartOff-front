import { ErrorType } from '../api/error';
import { SigninResponseType, SignupResponseType } from '../api/user';

export const signinSuccessMockInfo: SigninResponseType = {
  access_token: 'access_token',
  refresh_token: 'refresh_token',
  email: 'email@email.com',
  token_type: 'bearer',
  user_id: '1',
};

export const signinFailMockInfo: ErrorType = {
  errorMsg: '에러 발생',
};

export const signupSuccessMockInfo: SignupResponseType = {
  user_id: '1',
};

export const signupFailMockInfo: ErrorType = {
  errorMsg: '에러 발생',
};
