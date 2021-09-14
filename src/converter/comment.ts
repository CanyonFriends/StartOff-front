import { CommentClientType } from '../@types/client';
import { CommentServerType, IsDeleted } from '../@types/server';

export const commentServerType2ClientType = (comment: CommentServerType): CommentClientType => {
  return {
    commentId: String(comment.comment_id),
    userId: String(comment.user_id),
    content: comment.content,
    createdAt: new Date(comment.created_at),
    nickname: comment.nickname,
    isDeleted: comment.is_deleted === IsDeleted.Y,
  };
};
