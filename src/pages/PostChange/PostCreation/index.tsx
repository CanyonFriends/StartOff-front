import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { SkillClientType } from '../../../@types/client';
import { isFailed } from '../../../api/error';
import { getSkillsAPI } from '../../../api/skill';
import ChangePostTemplate from '../template';
import { RootState } from '../../../redux/store';
import { UserState } from '../../../redux/user/types';
import { createPostAPI } from '../../../api/post';
import { buildBoardPath } from '../../../Routes';
import { PostFormValidatorType } from '../../../validator/postFormValidator';
import { AlertModal } from '../../../components/UI/organism';

interface ParamsProps {
  board: string;
}

function CreatePost() {
  const history = useHistory();
  const { board } = useParams<ParamsProps>();
  const [error, setError] = useState('');
  const [totalSkills, setTotalSkills] = useState<SkillClientType[]>([]);
  const { userId } = useSelector<RootState>((state) => state.user) as UserState;

  useEffect(() => {
    getTotalSkills();
  }, []);

  const getTotalSkills = async () => {
    const response = await getSkillsAPI();
    if (isFailed<SkillClientType[]>(response)) {
      setError(response.error_msg);
      return;
    }
    setTotalSkills(response);
  };

  const createPostSubmit = async (values: PostFormValidatorType) => {
    const response = await createPostAPI({
      userId,
      category: board,
      content: values.content,
      currentPeople: values.currentPeople,
      maxPeople: values.maxPeople,
      title: values.title,
      postSkills: values.postSkills,
    });

    if (isFailed<boolean>(response)) {
      return response.error_msg;
    }

    history.push(buildBoardPath(board));
    return '';
  };

  const handleModalCloseButton = () => {
    history.push(buildBoardPath(board));
  };

  return (
    <>
      {!!error && <AlertModal content={error} clickCloseButton={handleModalCloseButton} />}
      <ChangePostTemplate totalSkillList={totalSkills} handleSubmit={createPostSubmit} />
    </>
  );
}

export default CreatePost;
