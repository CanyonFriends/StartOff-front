import React, { useMemo } from 'react';
import * as Style from './styled';
import CommonHeader from '../../../components/Layout/CommonHeader';
import { Dropdown, InputField } from '../../../components/UI/molecule';
import PostMarkdownForm from '../../../components/UI/organism/PostMarkdownForm';
import useForm from '../../../hooks/useForm';
import postFormValidator, { PostFormValidatorType } from '../../../validator/postFormValidator';
import { InputFieldProps } from '../../../components/UI/molecule/InputField';
import { SkillList, AlertModal } from '../../../components/UI/organism';
import { PostClientType, SkillClientType } from '../../../@types/client';
import { Button, Title } from '../../../components/UI/atom';

interface ChangePostTemplateProps {
  post?: PostClientType;
  totalSkillList: SkillClientType[];
  handleSubmit: (values: PostFormValidatorType) => Promise<string>;
}

function ChangePostTemplate({ post, totalSkillList, handleSubmit }: ChangePostTemplateProps) {
  const { values, error, clearError, handleChange, handleSubmitWithErrorControl } = useForm<PostFormValidatorType>({
    initialState: {
      title: post ? post.title : '',
      content: post ? post.content : '',
      currentPeople: post ? post.currentPeople : 0,
      maxPeople: post ? post.maxPeople : 0,
      postSkills: post ? post.postSkills : [],
    },
    validator: postFormValidator,
    onSubmit: handleSubmit,
  });
  const peopleNumber = useMemo(() => {
    return new Array(31).fill(0).map((_, index) => ({ id: String(index), text: String(index) }));
  }, []);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 20) return;
    handleChange({ ...values, title: event.target.value });
  };

  const handleCurrentPeopleChange = (value: string) => {
    handleChange({ ...values, currentPeople: Number(value) });
  };

  const handleMaxPeopleChange = (value: string) => {
    handleChange({ ...values, maxPeople: Number(value) });
  };

  const handleContentChange = (content: string) => {
    handleChange({ ...values, content });
  };

  const clickTotalSkillItem = (skillName: string) => {
    const selectedItem = totalSkillList.find((skill) => skill.skillName === skillName);
    if (!selectedItem) return;
    handleChange({ ...values, postSkills: [...values.postSkills, selectedItem] });
  };

  const deleteMySkill = (skillId: string) => {
    const skillListExceptDeletedSkill = values.postSkills.filter((skill) => skill.skillId !== skillId);
    handleChange({ ...values, postSkills: skillListExceptDeletedSkill });
  };

  const titleInputField: InputFieldProps = {
    group: 'title',
    ariaLabel: 'post-title',
    labelProps: { content: '제목', size: 'extraLarge', bolder: true },
    inputProps: { value: values.title, onChange: handleTitleChange, placeholder: '제목을 입력하세요', size: 'large' },
    sortDirection: 'column',
  };
  return (
    <>
      {!!error && <AlertModal content={error} clickCloseButton={clearError} />}
      <CommonHeader />
      <Style.Container onSubmit={handleSubmitWithErrorControl}>
        <InputField {...titleInputField} />
        <Style.PeopleWrapper>
          <Title fontsize="h3">현재 인원 / 모집 인원</Title>
          <Style.DropdownWrapper>
            <Dropdown
              ariaLabel="current-people-dropbox"
              isClickValueText
              placeholder={`현재 인원 : ${values.currentPeople}`}
              items={peopleNumber}
              clickItem={handleCurrentPeopleChange}
            />
            <Dropdown
              ariaLabel="max-people-dropbox"
              isClickValueText
              placeholder={`모집 인원 : ${values.maxPeople}`}
              items={peopleNumber}
              clickItem={handleMaxPeopleChange}
            />
          </Style.DropdownWrapper>
        </Style.PeopleWrapper>
        <Style.SkillListWrapper>
          <SkillList
            editableAuthority
            title="기술 스택"
            mySkillList={values.postSkills}
            totalSkillList={totalSkillList}
            clickTotalSkillItem={clickTotalSkillItem}
            deleteMySkill={deleteMySkill}
          />
        </Style.SkillListWrapper>
        <Style.MarkdownWrapper>
          <PostMarkdownForm markdown={values.content} handleChangeMarkdownText={handleContentChange} />
        </Style.MarkdownWrapper>
        <Button size="large" width="100%">
          글 쓰기
        </Button>
      </Style.Container>
    </>
  );
}

export default ChangePostTemplate;
