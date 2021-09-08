import axios from '../utils/axios';
import { ErrorType } from './error';
import { BoardServerType } from '../@types/server';
import { boardServerType2ClientType, createPostClientType2ServerType } from '../converter/post';
import { CreatePostClientType } from '../@types/client';

export const getCategoriesAPI = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: '/v1/categories',
    });

    return response.data as string[];
  } catch (error) {
    return { error_msg: error.response.data.error_msg } as ErrorType;
  }
};

export const getPostsAPI = async (page: number, size: number, category: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `/v1/posts?page=${page}&size=${size}&category=${category}`,
    });

    return boardServerType2ClientType(response.data as BoardServerType);
  } catch (error) {
    return { error_msg: error.response.data.error_msg } as ErrorType;
  }
};

export const createPostAPI = async (post: CreatePostClientType) => {
  try {
    await axios({
      method: 'POST',
      url: '/v1/posts',
      data: {
        ...createPostClientType2ServerType(post),
      },
    });
    return true;
  } catch (error) {
    return { error_msg: error.response.data.error_msg } as ErrorType;
  }
};
