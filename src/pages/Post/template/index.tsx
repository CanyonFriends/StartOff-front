import React from 'react';
import { useHistory } from 'react-router-dom';
import { CommentClientType, PostClientType } from '../../../@types/client';
import CommonHeader from '../../../components/Layout/CommonHeader';
import { CommentForm, PostTemplate } from '../../../components/UI/organism';
import * as Style from './styled';
import { deletePostAPI } from '../../../api/post';
import { isFailed } from '../../../api/error';
import { buildBoardPath, buildModifyPath } from '../../../Routes';
import { Title } from '../../../components/UI/atom';
import { createCommentAPI } from '../../../api/comment';
import { CommentValidatorType } from '../../../validator/commentValidator';

interface PostTemplateProps {
  editableAuthority: boolean;
  userId: string;
  post: PostClientType;
}

function PostPostTemplate({ editableAuthority, userId, post }: PostTemplateProps) {
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

  const createComment = async (value: CommentValidatorType) => {
    const response = await createCommentAPI({
      userId,
      postId: post.postId,
      content: value.comment,
    });
    if (isFailed<CommentClientType>(response)) {
      return '';
    }

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
          <Title fontsize="h3">댓글 ({post.comments.length})</Title>
          <CommentForm handleSubmit={createComment} />
        </Style.CommentWrapper>
      </Style.Container>
    </>
  );
}

export default PostPostTemplate;
