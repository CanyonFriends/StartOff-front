import axios from 'axios';
import { SignupInfoType } from '../validator/signupValidator';
import { LoginInfoType } from '../validator/loginValidator';

export interface ErrorType {
  error: string;
}

export interface SigninResponseType {
  access_token: string;
  refresh_token: string;
  email: string;
  token_type: string;
  user_id: string;
}

export const isFailed = <T>(arg: T | ErrorType): arg is ErrorType => {
  return (arg as ErrorType).error !== undefined;
};

// FIXME: 백엔드쪽 api구현이 완료되지않아 추후 수정 필요
export const signupAPI = async ({ id, pw, nickname }: SignupInfoType) => {
  try {
    const response = await axios({
      method: 'POST',
      url: '/v1/signup',
      data: {
        nickname,
        email: id,
        password: pw,
      },
    });
    return response;
  } catch (error) {
    return { error: error.response.data.errorMsg } as ErrorType;
  }
};

export const signinAPI = async ({ id, pw }: LoginInfoType): Promise<ErrorType | SigninResponseType> => {
  try {
    const response = await axios({
      method: 'POST',
      url: '/v1/login',
      data: {
        email: id,
        password: pw,
      },
    });
    return response.data as SigninResponseType;
  } catch (error) {
    return { error: error.response.data.errorMsg } as ErrorType;
  }
};
