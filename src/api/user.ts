import axios from 'axios';
import { SignupInfoType } from '../validator/signupValidator';
import { LoginInfoType } from '../validator/loginValidator';
import { ErrorType } from './error';

export interface SigninResponseType {
  access_token: string;
  refresh_token: string;
  email: string;
  token_type: string;
  user_id: string;
}

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
