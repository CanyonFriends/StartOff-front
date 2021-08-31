import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProfileAPI } from '../../api/profile';
import ProfileTemplate from './template';
import { ProfileClientType, SkillClientType } from '../../@types/client';
import { isFailed } from '../../api/error';
import { RootState } from '../../redux/store';
import { UserState } from '../../redux/user/types';
import { AlertModal } from '../../components/UI/organism';
import { getSkillsAPI } from '../../api/skill';

interface ParamProps {
  userId: string;
}

function Profile() {
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState<ProfileClientType | undefined>();
  const [totalSkills, setTotalSkills] = useState<SkillClientType[]>([]);
  const userState = useSelector<RootState>((state) => state.user) as UserState;
  const userId = useParams<ParamProps>().userId || '';
  const editableAuthority = userState.userId === userId;

  useEffect(() => {
    getProfileInfo();
    getTotalSkills();
  }, []);

  const getProfileInfo = async () => {
    const response = await getProfileAPI({ userId });
    if (isFailed<ProfileClientType>(response)) {
      setError(response.error_msg);
      return '';
    }
    setProfileData(response);
    return '';
  };

  const getTotalSkills = async () => {
    const response = await getSkillsAPI();
    if (isFailed<SkillClientType[]>(response)) {
      setError(response.error_msg);
      return '';
    }
    setTotalSkills(response);
    return '';
  };

  const handleModalCloseButton = () => {
    setError('');
  };

  return (
    <>
      {!!error.length && <AlertModal content={error} clickCloseButton={handleModalCloseButton} />}
      {profileData ? (
        <ProfileTemplate
          userId={userState.userId}
          editableAuthority={editableAuthority}
          nickname={profileData.nickname}
          introduce={profileData.introduce}
          imageUrl=""
          github={profileData.githubUrl}
          blog={profileData.blogUrl}
          mySkillList={profileData.userSkills}
          totalSkillList={totalSkills}
          projects={profileData.projects}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default Profile;
