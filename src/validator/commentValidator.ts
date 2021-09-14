export interface CommentValidatorType {
  commentId?: string;
  comment: string;
}

const commentValidator = ({ comment }: CommentValidatorType) => {
  if (comment.length < 5) return '댓글은 다섯글자 이상을 입력해야합니다';
  return '';
};

export default commentValidator;
