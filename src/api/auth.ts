import axios from 'axios';
import { SignupInfoType } from '../validator/signupValidator';
import { LoginInfoType } from '../validator/loginValidator';
import { ErrorType } from './error';

export interface SigninResponseType {
  access_token: string;
  uuid: string;
  email: string;
  nickname: string;
  user_id: string;
}

export interface SignupResponseType {
  user_id: string;
}

export interface LogoutRequestType {
  email: string;
  accessToken: string;
  uuid: string;
}

export interface LogoutResponseType {
  msg: string;
  success: boolean;
}

export const signupAPI = async ({ id, pw, nickname }: SignupInfoType): Promise<ErrorType | SignupResponseType> => {
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
    return response.data as SignupResponseType;
  } catch (error) {
    return { errorMsg: error.response.data.errorMsg } as ErrorType;
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
    return { errorMsg: error.response.data.errorMsg } as ErrorType;
  }
};

export const logoutAPI = async ({
  email,
  accessToken,
  uuid,
}: LogoutRequestType): Promise<ErrorType | LogoutResponseType> => {
  try {
    const response = await axios({
      method: 'POST',
      url: '/v1/logout',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        email,
        accessToken,
        uuid,
      },
    });
    return response.data as LogoutResponseType;
  } catch (error) {
    return { errorMsg: error.response.data.errorMsg } as ErrorType;
  }
};
