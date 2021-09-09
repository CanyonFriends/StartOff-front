import React from 'react';
import { useHistory } from 'react-router-dom';
import { PostClientType } from '../../../@types/client';
import CommonHeader from '../../../components/Layout/CommonHeader';
import { PostTemplate } from '../../../components/UI/organism';
import * as Style from './styled';
import { deletePostAPI } from '../../../api/post';
import { isFailed } from '../../../api/error';
import { buildBoardPath, buildModifyPath } from '../../../Routes';

interface PostTemplateProps {
  editableAuthority: boolean;
  post: PostClientType;
}

function PostPostTemplate({ editableAuthority, post }: PostTemplateProps) {
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
    history.push(buildBoardPath(post.category, 0));
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
      </Style.Container>
    </>
  );
}

export default PostPostTemplate;
