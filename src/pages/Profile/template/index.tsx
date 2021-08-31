import React, { useState } from 'react';
import * as Style from './styled';
import CommonHeader from '../../../components/Layout/CommonHeader';
import {
  ProfileIntroduce,
  ProfileInfoCard,
  ProjectModal,
  SkillList,
  AccountInfoModal,
  AlertModal,
  ProjectItem,
} from '../../../components/UI/organism';
import { ModifyProfileInfoCardValidatorType } from '../../../validator/modifyProfileInfoCardValidator';
import { ModifyProfileIntroduceValidatorType } from '../../../validator/modifyProfileIntroduceValidator';
import { ProfileInfoCardProps } from '../../../components/UI/organism/ProfileInfoCard';
import { SkillListProps } from '../../../components/UI/organism/SkillList/index';
import {
  updateProfileIntroduce,
  updateGithubIntroduce,
  updateBlogIntroduce,
  updateUserSkillAPI,
  deleteUserSkillAPI,
} from '../../../api/profile';
import { isFailed } from '../../../api/error';
import { ProjectClientType, SkillClientType } from '../../../@types/client';
import { Button, Icon, Title } from '../../../components/UI/atom';
import { UpdatePasswordValidatorType } from '../../../validator/updatePasswordValidator';
import { updatePasswordAPI } from '../../../api/user';
import { ProjectValidatorType } from '../../../validator/projectValidator';
import { createProjectAPI, deleteProjectAPI, updateProjectAPI } from '../../../api/project';

interface ProfileTemplateProps {
  userId: string;
  editableAuthority: boolean;
  nickname: string;
  introduce: string;
  imageUrl: string;
  github: string;
  blog: string;
  mySkillList: SkillClientType[];
  totalSkillList: SkillClientType[];
  projects: ProjectClientType[];
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
  projects,
}: ProfileTemplateProps) {
  const [accountInfoModalOpen, setAccountInfoModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [mySkillListState, setMySkillListState] = useState<SkillClientType[]>(mySkillList);
  const [projectsState, setProjectsState] = useState<ProjectClientType[]>(projects);

  const handleSubmitIntroduce = async ({ nickname, introduce, imageurl }: ModifyProfileIntroduceValidatorType) => {
    const response = await updateProfileIntroduce({ userId, nickname, introduce });
    if (isFailed<boolean>(response)) {
      return response.error_msg;
    }
    return '';
  };

  const handleSubmitGithub = async (data: ModifyProfileInfoCardValidatorType) => {
    const response = await updateGithubIntroduce({ userId, githubUrl: data.textValue });
    if (isFailed<boolean>(response)) {
      return response.error_msg;
    }
    return '';
  };

  const handleSubmitBlog = async (data: ModifyProfileInfoCardValidatorType) => {
    const response = await updateBlogIntroduce({ userId, blogUrl: data.textValue });
    if (isFailed<boolean>(response)) {
      return response.error_msg;
    }
    return '';
  };
  const handleClickTotalItem = async (skillName: string) => {
    const response = await updateUserSkillAPI({ userId, skillName });
    if (isFailed<SkillClientType>(response)) {
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

  const toggleAccountInfoModal = () => {
    setAccountInfoModalOpen(!accountInfoModalOpen);
  };

  const changePassword = async ({ currentPW, afterPW }: UpdatePasswordValidatorType) => {
    const response = await updatePasswordAPI({ userId, afterPW, beforePW: currentPW });
    if (isFailed<boolean>(response)) {
      return response.error_msg;
    }

    toggleAccountInfoModal();
    setSuccessMessage('비밀번호를 변경하였습니다');
    return '';
  };

  const deleteUser = async () => {
    // TODO: 추후 구현
  };

  const createProject = async (projectWithProgress: ProjectValidatorType) => {
    const project: ProjectClientType = {
      id: 0,
      title: projectWithProgress.title,
      content: projectWithProgress.content,
      introduce: projectWithProgress.introduce,
      deployUrl: projectWithProgress.deployUrl,
      githubUrl: projectWithProgress.githubUrl,
      startDate: projectWithProgress.startDate as Date,
      endDate: projectWithProgress.endDate as Date,
      projectSklls: projectWithProgress.projectSklls,
    };
    const response = await createProjectAPI({ userId, project });
    if (isFailed<ProjectClientType>(response)) {
      return response.error_msg;
    }
    setProjectsState([...projectsState, response]);
    toggleProjectCreateModal();
    return '';
  };

  const handleDeleteProjectItem = async (projectId: number) => {
    // TODO: confirm모달로 확인받기
    const response = await deleteProjectAPI({ userId, projectId });
    if (isFailed<boolean>(response)) {
      return;
    }
    const projectsStateExceptDeleted = projectsState.filter((project) => project.id !== projectId);
    setProjectsState(projectsStateExceptDeleted);
  };

  const handleModifyProjectItem = async (projectWithProgress: ProjectValidatorType) => {
    const project: ProjectClientType = {
      id: projectWithProgress.id || 0,
      title: projectWithProgress.title,
      content: projectWithProgress.content,
      introduce: projectWithProgress.introduce,
      deployUrl: projectWithProgress.deployUrl,
      githubUrl: projectWithProgress.githubUrl,
      startDate: projectWithProgress.startDate as Date,
      endDate: projectWithProgress.endDate as Date,
      projectSklls: projectWithProgress.projectSklls,
    };
    const response = await updateProjectAPI({ userId, project, projectId: projectWithProgress.id || 0 });
    if (isFailed<ProjectClientType>(response)) {
      return response.error_msg;
    }
    const updatedProjectsState = projectsState.map((project) => {
      if (project.id !== projectWithProgress.id) return project;
      return response;
    });
    setProjectsState(updatedProjectsState);
    return '';
  };

  const handleAlertModalClose = () => {
    setSuccessMessage('');
  };

  const toggleProjectCreateModal = () => {
    setProjectModalOpen(!projectModalOpen);
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
  const skillInfo: SkillListProps = {
    totalSkillList,
    editableAuthority,
    title: '기술 스택',
    mySkillList: mySkillListState,
    clickTotalSkillItem: handleClickTotalItem,
    deleteMySkill: handleDeleteMySkill,
  };
  return (
    <>
      {accountInfoModalOpen && (
        <AccountInfoModal
          handleCloseModal={toggleAccountInfoModal}
          changePassword={changePassword}
          deleteUser={deleteUser}
        />
      )}
      {projectModalOpen && (
        <ProjectModal
          isModify={false}
          totalSkillList={totalSkillList}
          handleModalClose={toggleProjectCreateModal}
          onSubmit={createProject}
        />
      )}
      {!!successMessage.length && (
        <AlertModal content={successMessage} clickCloseButton={handleAlertModalClose} isSuccess />
      )}
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
        <Style.UpdateAccountInfoWrapper>
          <Button size="medium" onClick={toggleAccountInfoModal}>
            계정 정보 변경
          </Button>
        </Style.UpdateAccountInfoWrapper>
        <Style.ProfileInfoWrapper>
          <ProfileInfoCard {...githubInfo} />
          <ProfileInfoCard {...blogInfo} />
          <SkillList {...skillInfo} />
        </Style.ProfileInfoWrapper>
        <Style.ProfileImageWrapper>
          <></>
        </Style.ProfileImageWrapper>
        <Style.ProfileProjectsWrapper>
          <Style.ProjectHeader>
            <Title fontsize="h2">프로젝트</Title>
            <Icon id="plus-icon" icon="Plus" onClick={toggleProjectCreateModal} />
          </Style.ProjectHeader>
          <Style.ProjectList>
            {projectsState.map((project) => (
              <Style.ProjectItem key={project.id}>
                <ProjectItem
                  editableAuthority={editableAuthority}
                  project={project}
                  totalSkillList={totalSkillList}
                  handleDeleteItem={handleDeleteProjectItem}
                  handleModifyItem={handleModifyProjectItem}
                />
              </Style.ProjectItem>
            ))}
          </Style.ProjectList>
        </Style.ProfileProjectsWrapper>
      </Style.Container>
    </>
  );
}

export default ProfileTemplate;
