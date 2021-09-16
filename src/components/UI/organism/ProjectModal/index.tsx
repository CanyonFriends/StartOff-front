import React, { useMemo } from 'react';
import * as Style from './styled';
import { ProjectClientType, SkillClientType } from '../../../../@types/client';
import { Button, Title } from '../../atom';
import { InputField, TextAreaField } from '../../molecule';
import { Calendar } from '..';
import ModalWrapper from '../../../Layout/ModalWrapper/index';
import useForm from '../../../../hooks/useForm';
import projectValidator, { ProjectValidatorType } from '../../../../validator/projectValidator';
import { InputFieldProps } from '../../molecule/InputField';
import theme from '../../../../style/theme';
import { TextAreaFieldProps } from '../../molecule/TextAreaField/index';
import SkillListEditor from '../SkillListEditor';
import { LabelProps } from '../../atom/Label';

interface ProjectModalProps {
  isModify: boolean;
  project?: ProjectClientType;
  totalSkillList: SkillClientType[];
  onSubmit: (data: ProjectValidatorType) => Promise<string>;
  handleModalClose: () => void;
}

function ProjectModal({ isModify, project, totalSkillList, onSubmit, handleModalClose }: ProjectModalProps) {
  const { values, error, handleChange, handleSubmitWithErrorControl } = useForm<ProjectValidatorType>({
    onSubmit,
    initialState: {
      id: project ? project.id : undefined,
      title: project ? project.title : '',
      introduce: project ? project.introduce : '',
      content: project ? project.content : '',
      deployUrl: project ? project.deployUrl : '',
      githubUrl: project ? project.githubUrl : '',
      startDate: project ? project.startDate : undefined,
      endDate: project ? project.endDate : undefined,
      projectSklls: project ? project.projectSklls : [],
      isProgress: !(project && project.endDate),
    },
    validator: projectValidator,
  });
  const totalSkillListExceptSelected = useMemo(() => {
    return totalSkillList.filter(
      (skill) => !values.projectSklls.find((selectedSkill) => selectedSkill.skillName === skill.skillName),
    );
  }, [values.projectSklls.length]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 20) return;
    handleChange({ ...values, title: event.target.value });
  };

  const handleIntroduceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 100) return;
    handleChange({ ...values, introduce: event.target.value });
  };

  const handleGithubChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 100) return;
    handleChange({ ...values, githubUrl: event.target.value });
  };

  const handleDeployChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 100) return;
    handleChange({ ...values, deployUrl: event.target.value });
  };

  const handleCalendarChange = (dates: Date[]) => {
    const [startDate, endDate] = dates;
    handleChange({ ...values, startDate, endDate });
  };

  const handleCalendarProgressCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange({ ...values, isProgress: event.target.checked });
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length > 200) return;
    handleChange({ ...values, content: event.target.value });
  };

  const handleClickTotalSkillItem = (skillName: string) => {
    const selectedItem = totalSkillListExceptSelected.find((skill) => skill.skillName === skillName);
    if (!selectedItem) return;
    handleChange({ ...values, projectSklls: [...values.projectSklls, selectedItem] });
  };

  const handleDeleteSelectedSkill = (skillId: string) => {
    const skillListExceptDeletedSkill = values.projectSklls.filter((skill) => skill.skillId !== skillId);
    handleChange({ ...values, projectSklls: skillListExceptDeletedSkill });
  };

  const titleInputInfo: InputFieldProps = {
    group: 'title',
    sortDirection: 'column',
    labelProps: { content: '프로젝트명', color: theme.color.color_primary_400, bolder: true, size: 'medium' },
    inputProps: {
      id: 'project-title',
      value: values.title,
      onChange: handleTitleChange,
      placeholder: '프로젝트명을 입력해주세요',
      size: 'small',
    },
  };

  const introduceInputInfo: InputFieldProps = {
    group: 'introduce',
    sortDirection: 'column',
    labelProps: { content: '한 줄 소개(100자)', color: theme.color.color_primary_400, bolder: true, size: 'medium' },
    inputProps: {
      id: 'project-introduce',
      value: values.introduce,
      onChange: handleIntroduceChange,
      placeholder: '프로젝트 한 줄로 요약',
      size: 'small',
    },
  };

  const githubInputInfo: InputFieldProps = {
    group: 'github',
    sortDirection: 'column',
    labelProps: { content: '깃허브 주소', color: theme.color.color_primary_400, bolder: true, size: 'medium' },
    inputProps: {
      id: 'project-github',
      value: values.githubUrl,
      onChange: handleGithubChange,
      placeholder: '깃허브 주소를 입력해주세요',
      size: 'small',
    },
  };

  const deployInputInfo: InputFieldProps = {
    group: 'deploy',
    sortDirection: 'column',
    labelProps: { content: '배포 주소', color: theme.color.color_primary_400, bolder: true, size: 'medium' },
    inputProps: {
      id: 'project-deploy',
      value: values.deployUrl,
      onChange: handleDeployChange,
      placeholder: '배포 주소를 입력해주세요',
      size: 'small',
    },
  };

  const calendarInputInfo: InputFieldProps = {
    group: 'calendar',
    sortDirection: 'row',
    labelProps: { content: '진행중', color: theme.color.color_primary_400, bolder: true, size: 'medium' },
    inputProps: {
      id: 'project-calendar',
      value: '진행중',
      width: 'auto',
      checked: values.isProgress,
      type: 'checkbox',
      onChange: handleCalendarProgressCheckbox,
    },
  };

  const skillListLabel: LabelProps = {
    content: '기술 스택',
    color: theme.color.color_primary_400,
    bolder: true,
    size: 'medium',
  };

  const contentTextareaInfo: TextAreaFieldProps = {
    group: 'content',
    sortDirection: 'column',
    labelProps: { content: '프로젝트 설명(200자)', color: theme.color.color_primary_400, bolder: true, size: 'medium' },
    textareaProps: {
      ariaLabel: 'project-content',
      value: values.content,
      onChange: handleContentChange,
      placeholder: '내용 입력',
      size: 'small',
    },
  };

  return (
    <ModalWrapper clickModalOutside={handleModalClose} isBlur>
      <Style.Container onSubmit={handleSubmitWithErrorControl}>
        <Title id="project-modal-title" fontsize="h2">
          프로젝트 {isModify ? '수정' : '생성'}
        </Title>
        <Style.InputWrapper>
          <InputField {...titleInputInfo} />
        </Style.InputWrapper>
        <Style.InputWrapper>
          <InputField {...introduceInputInfo} />
        </Style.InputWrapper>
        <Style.CalendarWrapper>
          <InputField {...calendarInputInfo} />
          <Calendar
            isRange={!values.isProgress}
            start={values.startDate}
            end={values.endDate}
            startPlaceholder="시작 날짜"
            endPlaceholder="종료 날짜"
            handleChangeDate={handleCalendarChange}
          />
        </Style.CalendarWrapper>
        <Style.InputWrapper>
          <InputField {...githubInputInfo} />
        </Style.InputWrapper>
        <Style.InputWrapper>
          <InputField {...deployInputInfo} />
        </Style.InputWrapper>
        <SkillListEditor
          editableAuthority
          label={skillListLabel}
          mySkillList={values.projectSklls}
          totalSkillList={totalSkillListExceptSelected}
          clickTotalSkillItem={handleClickTotalSkillItem}
          deleteMySkill={handleDeleteSelectedSkill}
        />
        <Style.TextAreaWrapper>
          <TextAreaField {...contentTextareaInfo} />
        </Style.TextAreaWrapper>
        <Style.Error>{error}</Style.Error>
        <Button size="large" width="100%">
          {isModify ? '수정하기' : '생성하기'}
        </Button>
      </Style.Container>
    </ModalWrapper>
  );
}

export default ProjectModal;
