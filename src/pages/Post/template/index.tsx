import React from 'react';
import { PostClientType } from '../../../@types/client';
import CommonHeader from '../../../components/Layout/CommonHeader';
import { PostTemplate } from '../../../components/UI/organism';
import * as Style from './styled';

interface PostTemplateProps {
  editableAuthority: boolean;
  post: PostClientType;
}

function PostPostTemplate({ editableAuthority, post }: PostTemplateProps) {
  const handleModifyPost = () => {};

  const handleDeletePost = () => {};

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
