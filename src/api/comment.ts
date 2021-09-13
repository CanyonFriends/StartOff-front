import { AxiosError } from 'axios';
import { ErrorType } from './error';
import axios from '../utils/axios';
import { CommentServerType } from '../@types/server';
import { commentServerType2ClientType } from '../converter/comment';

export interface CreateCommentRequest {
  postId: string;
  userId: string;
  content: string;
}

export interface UpdateCommentRequest {
  postId: string;
  userId: string;
  content: string;
  commentId: string;
}

export interface DeleteCommentRequest {
  postId: string;
  commentId: string;
}

export const createCommentAPI = async ({ postId, userId, content }: CreateCommentRequest) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `/v1/posts/${postId}/comments`,
      data: {
        parend_id: null,
        user_id: userId,
        content,
      },
    });

    return commentServerType2ClientType(response.data as CommentServerType);
  } catch (error) {
    return { error_msg: (error as AxiosError).response?.data?.error_msg } as ErrorType;
  }
};

export const updateCommentAPI = async ({ postId, userId, content, commentId }: UpdateCommentRequest) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: `/v1/posts/${postId}/comments/${commentId}`,
      data: {
        parend_id: null,
        user_id: userId,
        content,
      },
    });

    return commentServerType2ClientType(response.data as CommentServerType);
  } catch (error) {
    return { error_msg: (error as AxiosError).response?.data?.error_msg } as ErrorType;
  }
};

export const deleteCommentAPI = async ({ postId, commentId }: DeleteCommentRequest) => {
  try {
    await axios({
      method: 'DELETE',
      url: `/v1/posts/${postId}/comments/${commentId}`,
    });

    return true;
  } catch (error) {
    return { error_msg: (error as AxiosError).response?.data?.error_msg } as ErrorType;
  }
};
