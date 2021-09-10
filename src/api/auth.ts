import { AxiosError } from 'axios';
import axios from '../utils/axios';
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

export interface LogoutRequestType {
  email: string;
  accessToken: string;
  uuid: string;
}

export const signupAPI = async ({ id, pw, nickname }: SignupInfoType): Promise<ErrorType | boolean> => {
  try {
    await axios({
      method: 'POST',
      url: '/v1/signup',
      data: {
        nickname,
        email: id,
        password: pw,
      },
    });
    return true;
  } catch (error) {
    return { error_msg: (error as AxiosError).response?.data?.error_msg } as ErrorType;
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
    return { error_msg: (error as AxiosError).response?.data?.error_msg } as ErrorType;
  }
};

export const logoutAPI = async ({ email, accessToken, uuid }: LogoutRequestType): Promise<ErrorType | boolean> => {
  try {
    await axios({
      method: 'POST',
      url: '/v1/logout',
      data: {
        email,
        uuid,
        access_token: accessToken,
      },
    });
    return true;
  } catch (error) {
    return { error_msg: (error as AxiosError).response?.data?.error_msg } as ErrorType;
  }
};
