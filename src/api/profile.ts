import { ProjectServerResponseType, SkillServerType } from '../@types/server';
import axios from '../utils/axios';
import { ErrorType } from './error';
import { ProfileType, SkillType } from '../@types/client';
import { profileResponse2Type } from '../converter/profile';
import { skillServerType2ClientType } from '../converter/skill';

export interface GetProfileRequest {
  userId: string;
}

export interface GetProfileResponse {
  baekjoon_id: string;
  blog_url: string;
  github_url: string;
  introduce: string;
  nickname: string;
  projects: ProjectServerResponseType[];
  user_skills: SkillServerType[];
}

export interface UpdateProfileIntroduceRequest {
  userId: string;
  introduce: string;
  nickname: string;
}

export interface UpdateProfileGithubRequest {
  userId: string;
  githubUrl: string;
}

export interface UpdateProfileBlogRequest {
  userId: string;
  blogUrl: string;
}

export interface UpdateUserSkillRequest {
  userId: string;
  skillName: string;
}

export interface DeleteUserSkillRequest {
  userId: string;
  skillId: string;
}

export const getProfileAPI = async ({ userId }: GetProfileRequest): Promise<ProfileType | ErrorType> => {
  try {
    const response = await axios({
      method: 'GET',
      url: `/v1/users/${userId}/profile`,
    });
    return profileResponse2Type(response.data as GetProfileResponse);
  } catch (error) {
    return { error_msg: error.response.data.error_msg } as ErrorType;
  }
};

export const updateProfileIntroduce = async ({
  userId,
  introduce,
  nickname,
}: UpdateProfileIntroduceRequest): Promise<boolean | ErrorType> => {
  try {
    await axios({
      method: 'PUT',
      url: `/v1/users/${userId}/introduce`,
      data: {
        introduce,
        nickname,
      },
    });
    return true;
  } catch (error) {
    return { error_msg: error.response.data.error_msg } as ErrorType;
  }
};

// TODO: 이름 변경
export const updateGithubIntroduce = async ({
  userId,
  githubUrl,
}: UpdateProfileGithubRequest): Promise<boolean | ErrorType> => {
  try {
    await axios({
      method: 'PUT',
      url: `/v1/users/${userId}/github-url`,
      data: {
        github_url: githubUrl,
      },
    });
    return true;
  } catch (error) {
    return { error_msg: error.response.data.error_msg } as ErrorType;
  }
};

export const updateBlogIntroduce = async ({
  userId,
  blogUrl,
}: UpdateProfileBlogRequest): Promise<boolean | ErrorType> => {
  try {
    await axios({
      method: 'PUT',
      url: `/v1/users/${userId}/blog-url`,
      data: {
        blog_url: blogUrl,
      },
    });
    return true;
  } catch (error) {
    return { error_msg: error.response.data.error_msg } as ErrorType;
  }
};

export const updateUserSkillAPI = async ({
  userId,
  skillName,
}: UpdateUserSkillRequest): Promise<SkillType | ErrorType> => {
  try {
    const response = await axios({
      method: 'PUT',
      url: `/v1/users/${userId}/skills`,
      data: {
        skill_name: skillName,
      },
    });
    return skillServerType2ClientType(response.data as SkillServerType);
  } catch (error) {
    return { error_msg: error.response.data.error_msg } as ErrorType;
  }
};

export const deleteUserSkillAPI = async ({ userId, skillId }: DeleteUserSkillRequest): Promise<boolean | ErrorType> => {
  try {
    await axios({
      method: 'DELETE',
      url: `/v1/users/${userId}/skills/${skillId}`,
    });
    return true;
  } catch (error) {
    return { error_msg: error.response.data.error_msg } as ErrorType;
  }
};
