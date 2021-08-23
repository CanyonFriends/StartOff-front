import React from 'react';
import * as Style from './styled';
import CommonHeader from '../../../components/Layout/CommonHeader';
import { ProfileIntroduce, ProfileInfoCard, ProfileTagCard } from '../../../components/UI/organism';
import { ModifyProfileInfoCardType } from '../../../validator/modifyProfileInfoCard';
import { ModifyProfileIntroduceType } from '../../../validator/modifyProfileIntroduce';
import { ProfileInfoCardProps } from '../../../components/UI/organism/ProfileInfoCard';
import { ProfileTagCardProps } from '../../../components/UI/organism/ProfileTagCard/index';
import { TagProps } from '../../../components/UI/atom/Tag/index';

interface ProfileTemplateProps {
  editableAuthority: boolean;
  nickname: string;
  introduce: string;
  imageUrl: string;
  github: string;
  blog: string;
  tagContents: TagProps[];
}

function ProfileTemplate({
  editableAuthority,
  nickname,
  introduce,
  imageUrl,
  github,
  blog,
  tagContents,
}: ProfileTemplateProps) {
  const handleSubmitIntroduce = async (data: ModifyProfileIntroduceType) => {
    return '';
  };

  const handleSubmitGithub = async (data: ModifyProfileInfoCardType) => {
    return '';
  };

  const handleSubmitBlog = async (data: ModifyProfileInfoCardType) => {
    return '';
  };

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
