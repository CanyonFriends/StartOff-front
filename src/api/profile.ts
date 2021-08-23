import { ProjectServerType, SkillServerType } from '../@types/server';
import axios from '../utils/axios';
import { ErrorType } from './error';

export interface GetProfileRequest {
  userId: string;
}

export interface GetProfileResponse {
  baekjoon_id: string;
  blog_url: string;
  github_url: string;
  introduce: string;
  nickname: string;
  projects: ProjectServerType[];
  user_skills: SkillServerType[];
}

export const getProfile = async ({ userId }: GetProfileRequest): Promise<GetProfileResponse | ErrorType> => {
  try {
    const response = await axios({
      method: 'GET',
      url: `/v1/users/${userId}/profile`,
    });
    return response.data as GetProfileResponse;
  } catch (error) {
    return { error_msg: error.response.data.error_msg } as ErrorType;
  }
};
