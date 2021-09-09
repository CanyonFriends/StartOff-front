import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostTemplate from './template/index';
import { PostClientType } from '../../@types/client';
import { getPostAPI } from '../../api/post';
import { isFailed } from '../../api/error';
import { RootState } from '../../redux/store';
import { UserState } from '../../redux/user/types';

interface ParamProps {
  board: string;
  postId: string;
}

function Post() {
  const { postId } = useParams<ParamProps>();
  const [post, setPost] = useState<PostClientType>();
  const userState = useSelector<RootState>((state) => state.user) as UserState;

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const response = await getPostAPI(postId);
    if (isFailed<PostClientType>(response)) {
      return;
    }
    setPost(response);
  };

  // FIXME: 권한 검사를 id를 받아와서 해야될 것 같다.
  return post ? <PostTemplate post={post} editableAuthority={userState.nickname === post.nickname} /> : <></>;
}

export default Post;
