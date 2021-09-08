import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SkillClientType } from '../../@types/client';
import { isFailed } from '../../api/error';
import { getSkillsAPI } from '../../api/skill';
import CreatePostTemplate from './template';
import { RootState } from '../../redux/store';
import { UserState } from '../../redux/user/types';

interface ParamsProps {
  board: string;
}

function CreatePost() {
  const [totalSkills, setTotalSkills] = useState<SkillClientType[]>([]);
  const { board } = useParams<ParamsProps>();
  const { userId } = useSelector<RootState>((state) => state.user) as UserState;

  useEffect(() => {
    getTotalSkills();
  }, []);

  const getTotalSkills = async () => {
    const response = await getSkillsAPI();
    if (isFailed<SkillClientType[]>(response)) {
      return;
    }
    setTotalSkills(response);
  };

  return <CreatePostTemplate totalSkillList={totalSkills} board={board} userId={userId} />;
}

export default CreatePost;
