import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { PostClientType, SkillClientType } from '../../../@types/client';
import { isFailed } from '../../../api/error';
import { getPostAPI } from '../../../api/post';
import { getSkillsAPI } from '../../../api/skill';
import ChangePostTemplate from '../template';
import { PostFormValidatorType } from '../../../validator/postFormValidator';
import { buildPostPath } from '../../../Routes';

interface ParamProps {
  postId: string;
}

function ModifyPost() {
  const history = useHistory();
  const { postId } = useParams<ParamProps>();
  const [post, setPost] = useState<PostClientType>();
  const [totalSkills, setTotalSkills] = useState<SkillClientType[]>([]);

  useEffect(() => {
    getPost();
    getTotalSkills();
  }, []);

  const getPost = async () => {
    const response = await getPostAPI(postId);
    if (isFailed<PostClientType>(response)) {
      return;
    }
    setPost(response);
  };

  const getTotalSkills = async () => {
    const response = await getSkillsAPI();
    if (isFailed<SkillClientType[]>(response)) {
      return;
    }
    setTotalSkills(response);
  };

  const modifyPostSubmit = async (values: PostFormValidatorType) => {
    history.push(buildPostPath(postId));
    return '';
  };

  return <ChangePostTemplate post={post} totalSkillList={totalSkills} handleSubmit={modifyPostSubmit} />;
}

export default ModifyPost;
