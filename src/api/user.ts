import axios from '../utils/axios';
import { ErrorType } from './error';

interface GetSelfRequest {
  accessToken: string;
}

export interface GetSelfResponse {
  user_id: string;
  nickname: string;
  email: string;
}

export interface UpdatePasswordRequest {
  userId: string;
  beforePW: string;
  afterPW: string;
}

export const getSelfAPI = async ({ accessToken }: GetSelfRequest) => {
  try {
    const response = await axios({
      method: 'GET',
      url: '/v1/users/self',
    });

    return response.data as GetSelfResponse;
  } catch (error) {
    return { error_msg: error.response.data.error_msg } as ErrorType;
  }
};

export const updatePasswordAPI = async ({
  userId,
  beforePW,
  afterPW,
}: UpdatePasswordRequest): Promise<boolean | ErrorType> => {
  try {
    await axios({
      method: 'PUT',
      url: `/v1/users/${userId}/password`,
      data: {
        after_password: afterPW,
        before_password: beforePW,
      },
    });

    return true;
  } catch (error) {
    return { error_msg: error.response.data.error_msg } as ErrorType;
  }
};
