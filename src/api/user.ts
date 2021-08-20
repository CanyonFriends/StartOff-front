import axios from 'axios';
import { ErrorType } from './error';

interface GetSelfRequest {
  accessToken: string;
}

export interface GetSelfResponse {
  user_id: string;
  nickname: string;
  email: string;
}

export const getSelfAPI = async ({ accessToken }: GetSelfRequest) => {
  try {
    const response = await axios({
      method: 'GET',
      url: '/v1/users/self',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data as GetSelfResponse;
  } catch (error) {
    return { error_msg: error.response.data.error_msg } as ErrorType;
  }
};
