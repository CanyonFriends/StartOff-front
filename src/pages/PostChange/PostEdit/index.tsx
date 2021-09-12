import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { PostClientType, SkillClientType } from '../../../@types/client';
import { isFailed } from '../../../api/error';
import { getPostAPI, updatePostAPI } from '../../../api/post';
import { getSkillsAPI } from '../../../api/skill';
import ChangePostTemplate from '../template';
import { PostFormValidatorType } from '../../../validator/postFormValidator';
import { buildPostPath } from '../../../Routes';
import { RootState } from '../../../redux/store';
import { UserState } from '../../../redux/user/types';
import { AlertModal } from '../../../components/UI/organism';

interface ParamProps {
  postId: string;
}

function ModifyPost() {
  const history = useHistory();
  const { postId } = useParams<ParamProps>();
  const [post, setPost] = useState<PostClientType>();
  const [error, setError] = useState('');
  const [totalSkills, setTotalSkills] = useState<SkillClientType[]>([]);
  const { userId } = useSelector<RootState>((state) => state.user) as UserState;

  useEffect(() => {
    getPost();
    getTotalSkills();
  }, []);

  const getPost = async () => {
    const response = await getPostAPI(postId);
    if (isFailed<PostClientType>(response)) {
      setError(response.error_msg);
      return;
    }
    setPost(response);
  };

  const getTotalSkills = async () => {
    const response = await getSkillsAPI();
    if (isFailed<SkillClientType[]>(response)) {
      setError(response.error_msg);
      return;
    }
    setTotalSkills(response);
  };

  const modifyPostSubmit = async (values: PostFormValidatorType) => {
    if (!post) return '';
    const response = await updatePostAPI(postId, {
      userId,
      category: post.category,
      content: values.content,
      currentPeople: values.currentPeople,
      maxPeople: values.maxPeople,
      title: values.title,
      postSkills: values.postSkills,
    });

    if (isFailed<boolean>(response)) {
      return response.error_msg;
    }

    history.push(buildPostPath(post.category, postId));
    return '';
  };

  const handleModalCloseButton = () => {};

  return (
    <>
      {!!error && <AlertModal content={error} clickCloseButton={handleModalCloseButton} />}
      {post ? <ChangePostTemplate post={post} totalSkillList={totalSkills} handleSubmit={modifyPostSubmit} /> : <></>}
    </>
  );
}

export default ModifyPost;
