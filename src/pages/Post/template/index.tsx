import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CommentClientType, PostClientType } from '../../../@types/client';
import CommonHeader from '../../../components/Layout/CommonHeader';
import { CommentForm, CommentTemplate, PostTemplate } from '../../../components/UI/organism';
import * as Style from './styled';
import { deletePostAPI } from '../../../api/post';
import { isFailed } from '../../../api/error';
import { buildBoardPath, buildModifyPath } from '../../../Routes';
import { Title } from '../../../components/UI/atom';
import { createCommentAPI, deleteCommentAPI, updateCommentAPI } from '../../../api/comment';
import { CommentValidatorType } from '../../../validator/commentValidator';

interface PostTemplateProps {
  editableAuthority: boolean;
  userId: string;
  post: PostClientType;
}

function PostPostTemplate({ editableAuthority, userId, post }: PostTemplateProps) {
  const [commentState, setCommentState] = useState(post.comments);
  const history = useHistory();
  const handleModifyPost = async () => {
    history.push(buildModifyPath(post.postId));
  };

  const handleDeletePost = async () => {
    // TODO: confirm으로 확인 한번 받기
    const response = await deletePostAPI(post.postId);
    if (isFailed<boolean>(response)) {
      return;
    }
    history.push(buildBoardPath(post.category));
  };

  const handleDeleteComment = async (commentId: string) => {
    const response = await deleteCommentAPI({ commentId, postId: post.postId });
    if (isFailed<boolean>(response)) {
      return;
    }
    const newComment = commentState.filter((comment) => comment.commentId !== commentId);
    setCommentState(newComment);
  };

  const createComment = async (value: CommentValidatorType) => {
    const response = await createCommentAPI({
      userId,
      postId: post.postId,
      content: value.comment,
    });
    if (isFailed<CommentClientType>(response)) {
      return '';
    }

    setCommentState([...commentState, response]);
    return '';
  };

  const modifyComment = async (value: CommentValidatorType) => {
    if (!value.commentId) return 'error';

    const response = await updateCommentAPI({
      userId,
      commentId: value.commentId,
      postId: post.postId,
      content: value.comment,
    });
    if (isFailed<CommentClientType>(response)) {
      return response.error_msg;
    }

    const newCommentState = commentState.map((comment) => {
      if (comment.commentId !== value.commentId) return comment;
      return response;
    });

    setCommentState(newCommentState);
    return '';
  };

  return (
    <>
      <CommonHeader />
      <Style.Container>
        <Style.PostWrapper>
          <PostTemplate
            editableAuthority={editableAuthority}
            title={post.title}
            content={post.content}
            currentPeople={post.currentPeople}
            maxPeople={post.maxPeople}
            postSkills={post.postSkills}
            nickname={post.nickname}
            handleModifyPost={handleModifyPost}
            handleDeletePost={handleDeletePost}
          />
        </Style.PostWrapper>
        <Style.CommentWrapper>
          <Title fontsize="h3">댓글 ({commentState.length})</Title>
          <CommentForm handleSubmit={createComment} />
          <Style.CommentList>
            {commentState.map((comment) => (
              <Style.CommentItem key={comment.commentId}>
                <CommentTemplate
                  editableAuthority={comment.userId === userId}
                  comment={comment}
                  handleDelete={handleDeleteComment}
                  handleSubmitModify={modifyComment}
                />
              </Style.CommentItem>
            ))}
          </Style.CommentList>
        </Style.CommentWrapper>
      </Style.Container>
    </>
  );
}

export default PostPostTemplate;
