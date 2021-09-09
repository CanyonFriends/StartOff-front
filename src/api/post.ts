import { AxiosError } from 'axios';
import axios from '../utils/axios';
import { ErrorType } from './error';
import { BoardServerType, PostServerType } from '../@types/server';
import {
  boardServerType2ClientType,
  createPostClientType2ServerType,
  postServerType2ClientType,
} from '../converter/post';
import { CreatePostClientType } from '../@types/client';

export const getCategoriesAPI = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: '/v1/categories',
    });

    return response.data as string[];
  } catch (error) {
    return { error_msg: (error as AxiosError).response?.data?.error_msg } as ErrorType;
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
    return { error_msg: (error as AxiosError).response?.data?.error_msg } as ErrorType;
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
    return { error_msg: (error as AxiosError).response?.data?.error_msg } as ErrorType;
  }
};

export const getPostAPI = async (postId: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `/v1/posts/${postId}`,
    });
    return postServerType2ClientType(response.data as PostServerType);
  } catch (error) {
    return { error_msg: (error as AxiosError).response?.data?.error_msg } as ErrorType;
  }
};

export const deletePostAPI = async (postId: string) => {
  try {
    await axios({
      method: 'DELETE',
      url: `/v1/posts/${postId}`,
    });
    return true;
  } catch (error) {
    return { error_msg: (error as AxiosError).response?.data?.error_msg } as ErrorType;
  }
};

export const updatePostAPI = async (postId: string, post: CreatePostClientType) => {
  try {
    await axios({
      method: 'PUT',
      url: `/v1/posts/${postId}`,
      data: {
        ...createPostClientType2ServerType(post),
      },
    });
    return true;
  } catch (error) {
    return { error_msg: (error as AxiosError).response?.data?.error_msg } as ErrorType;
  }
};
