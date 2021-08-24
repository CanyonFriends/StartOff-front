import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProfileAPI } from '../../api/profile';
import ProfileTemplate from './template';
import { ProfileType } from '../../@types/client';
import { isFailed } from '../../api/error';
import { RootState } from '../../redux/store';
import { UserState } from '../../redux/user/types';
import { AlertModal } from '../../components/UI/organism';

interface ParamProps {
  userId: string;
}

function Profile() {
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState<ProfileType | undefined>();
  const userState = useSelector<RootState>((state) => state.user) as UserState;
  const { userId } = useParams<ParamProps>();
  const editableAuthority = userState.userId === userId;

  useEffect(() => {
    getProfileInfo();
  }, []);

  const getProfileInfo = async () => {
    const response = await getProfileAPI({ userId });
    if (isFailed<ProfileType>(response)) {
      return '';
    }
    setProfileData(response);
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
          tagContents={profileData.userSkills}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default Profile;
