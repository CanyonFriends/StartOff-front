import React from 'react';
import * as Style from './styled';
import CommonHeader from '../../../components/Layout/CommonHeader';
import { ProfileIntroduce, ProfileInfoCard, ProfileTagCard } from '../../../components/UI/organism';
import { ModifyProfileInfoCardType } from '../../../validator/modifyProfileInfoCard';
import { ModifyProfileIntroduceType } from '../../../validator/modifyProfileIntroduce';
import { ProfileInfoCardProps } from '../../../components/UI/organism/ProfileInfoCard';
import { ProfileTagCardProps } from '../../../components/UI/organism/ProfileTagCard/index';
import { TagProps } from '../../../components/UI/atom/Tag/index';
import { updateProfileIntroduce, updateGithubIntroduce, updateBlogIntroduce } from '../../../api/profile';
import { isFailed } from '../../../api/error';

interface ProfileTemplateProps {
  userId: string;
  editableAuthority: boolean;
  nickname: string;
  introduce: string;
  imageUrl: string;
  github: string;
  blog: string;
  tagContents: TagProps[];
}

function ProfileTemplate({
  userId,
  editableAuthority,
  nickname,
  introduce,
  imageUrl,
  github,
  blog,
  tagContents,
}: ProfileTemplateProps) {
  const handleSubmitIntroduce = async ({ nickname, introduce, imageurl }: ModifyProfileIntroduceType) => {
    const response = await updateProfileIntroduce({ userId, nickname, introduce });
    if (isFailed<boolean>(response)) {
      return response.error_msg;
    }
    return '';
  };

  const handleSubmitGithub = async (data: ModifyProfileInfoCardType) => {
    const response = await updateGithubIntroduce({ userId, githubUrl: data.textValue });
    if (isFailed<boolean>(response)) {
      return response.error_msg;
    }
    return '';
  };

  const handleSubmitBlog = async (data: ModifyProfileInfoCardType) => {
    const response = await updateBlogIntroduce({ userId, blogUrl: data.textValue });
    if (isFailed<boolean>(response)) {
      return response.error_msg;
    }
    return '';
  };
  const handleClickTagItem = async () => {};

  const githubInfo: ProfileInfoCardProps = {
    editableAuthority,
    title: 'Github',
    textValue: github,
    iconType: 'Logo',
    handleSubmit: handleSubmitGithub,
  };
  const blogInfo: ProfileInfoCardProps = {
    editableAuthority,
    title: 'Blog',
    textValue: blog,
    iconType: 'Home',
    handleSubmit: handleSubmitBlog,
  };
  const tagInfo: ProfileTagCardProps = {
    editableAuthority,
    tagContents,
    clickTagItem: handleClickTagItem,
    title: '기술 스택',
  };
  return (
    <>
      <CommonHeader />
      <Style.Container>
        <Style.ProfileHeaderWrapper>
          <ProfileIntroduce
            editableAuthority={editableAuthority}
            nickname={nickname}
            introduce={introduce}
            imageurl={imageUrl}
            handleSubmit={handleSubmitIntroduce}
          />
        </Style.ProfileHeaderWrapper>
        <Style.ProfileInfoWrapper>
          <ProfileInfoCard {...githubInfo} />
          <ProfileInfoCard {...blogInfo} />
          <ProfileTagCard {...tagInfo} />
        </Style.ProfileInfoWrapper>
        <Style.ProfileImageWrapper>
          <></>
        </Style.ProfileImageWrapper>
        <Style.ProfileProjectsWrapper>
          <></>
        </Style.ProfileProjectsWrapper>
      </Style.Container>
    </>
  );
}

export default ProfileTemplate;
