import { AxiosError } from 'axios';
import { ErrorType } from './error';
import axios from '../utils/axios';
import { CommentServerType } from '../@types/server';
import { commentServerType2ClientType } from '../converter/comment';

export interface CreatePostRequest {
  postId: string;
  userId: string;
  content: string;
}

export const createCommentAPI = async ({ postId, userId, content }: CreatePostRequest) => {
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
