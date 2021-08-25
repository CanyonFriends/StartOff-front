import React, { useState } from 'react';
import * as Style from './styled';
import CommonHeader from '../../../components/Layout/CommonHeader';
import { ProfileIntroduce, ProfileInfoCard, ProfileSkillCard } from '../../../components/UI/organism';
import { ModifyProfileInfoCardType } from '../../../validator/modifyProfileInfoCard';
import { ModifyProfileIntroduceType } from '../../../validator/modifyProfileIntroduce';
import { ProfileInfoCardProps } from '../../../components/UI/organism/ProfileInfoCard';
import { ProfileSkillCardProps } from '../../../components/UI/organism/ProfileSkillCard/index';
import {
  updateProfileIntroduce,
  updateGithubIntroduce,
  updateBlogIntroduce,
  updateUserSkillAPI,
  deleteUserSkillAPI,
} from '../../../api/profile';
import { isFailed } from '../../../api/error';
import { SkillType } from '../../../@types/client';

interface ProfileTemplateProps {
  userId: string;
  editableAuthority: boolean;
  nickname: string;
  introduce: string;
  imageUrl: string;
  github: string;
  blog: string;
  mySkillList: SkillType[];
  totalSkillList: SkillType[];
}

function ProfileTemplate({
  userId,
  editableAuthority,
  nickname,
  introduce,
  imageUrl,
  github,
  blog,
  mySkillList,
  totalSkillList,
}: ProfileTemplateProps) {
  const [mySkillListState, setMySkillListState] = useState<SkillType[]>(mySkillList);

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
  const handleClickTotalItem = async (skillName: string) => {
    const response = await updateUserSkillAPI({ userId, skillName });
    if (isFailed<SkillType>(response)) {
      return response.error_msg;
    }
    setMySkillListState([...mySkillListState, response]);
    return '';
  };

  const handleDeleteMySkill = async (skillId: string) => {
    const response = await deleteUserSkillAPI({ userId, skillId });
    if (isFailed<boolean>(response)) {
      return response.error_msg;
    }
    const newSkillListState = mySkillListState.filter((skill) => skill.skillId !== skillId);
    setMySkillListState(newSkillListState);
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
  const skillInfo: ProfileSkillCardProps = {
    totalSkillList,
    editableAuthority,
    title: '기술 스택',
    mySkillList: mySkillListState,
    clickTotalSkillItem: handleClickTotalItem,
    deleteMySkill: handleDeleteMySkill,
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
          <ProfileSkillCard {...skillInfo} />
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
