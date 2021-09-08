import React, { useEffect, useState } from 'react';
import { SkillClientType } from '../../@types/client';
import { isFailed } from '../../api/error';
import { getSkillsAPI } from '../../api/skill';
import CreatePostTemplate from './template';

function CreatePost() {
  const [totalSkills, setTotalSkills] = useState<SkillClientType[]>([]);

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

  return <CreatePostTemplate totalSkillList={totalSkills} />;
}

export default CreatePost;
