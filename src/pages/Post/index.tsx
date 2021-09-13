import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import PostTemplate from './template/index';
import { PostClientType } from '../../@types/client';
import { getPostAPI } from '../../api/post';
import { isFailed } from '../../api/error';
import { RootState } from '../../redux/store';
import { UserState } from '../../redux/user/types';
import { buildBoardPath } from '../../Routes';

interface ParamProps {
  postId: string;
  board: string;
}

function Post() {
  const history = useHistory();
  const { postId, board } = useParams<ParamProps>();
  const [post, setPost] = useState<PostClientType>();
  const userState = useSelector<RootState>((state) => state.user) as UserState;

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const response = await getPostAPI(postId);
    if (isFailed<PostClientType>(response)) {
      history.push(buildBoardPath(board));
      return;
    }
    setPost(response);
  };

  return post ? (
    <PostTemplate post={post} userId={userState.userId} editableAuthority={userState.userId === post.userId} />
  ) : (
    <></>
  );
}

export default Post;
