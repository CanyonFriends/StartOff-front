import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import * as Style from './styled';
import CommonHeader from '../../../components/Layout/CommonHeader';
import { Dropdown, InputField } from '../../../components/UI/molecule';
import PostMarkdownForm from '../../../components/UI/organism/PostMarkdownForm';
import useForm from '../../../hooks/useForm';
import postFormValidator, { PostFormValidatorType } from '../../../validator/postFormValidator';
import { InputFieldProps } from '../../../components/UI/molecule/InputField';
import { SkillList, AlertModal } from '../../../components/UI/organism';
import { SkillClientType } from '../../../@types/client';
import { Button, Title } from '../../../components/UI/atom';
import { createPostAPI } from '../../../api/post';
import { isFailed } from '../../../api/error';
import { buildBoardPath } from '../../../Routes';

interface CreatePostTemplateProps {
  totalSkillList: SkillClientType[];
  board: string;
  userId: string;
}

function CreatePostTemplate({ totalSkillList, board, userId }: CreatePostTemplateProps) {
  const history = useHistory();
  const createPostSubmit = async (values: PostFormValidatorType) => {
    const response = await createPostAPI({
      userId,
      category: board,
      content: values.content,
      currentPeople: values.currentPeople,
      maxPeople: values.maxPeople,
      title: values.title,
      postSkills: values.postSkills,
    });

    if (isFailed<boolean>(response)) {
      return response.error_msg;
    }

    history.push(buildBoardPath(board, 0));
    return '';
  };
  const { values, error, clearError, handleChange, handleSubmitWithErrorControl } = useForm<PostFormValidatorType>({
    initialState: {
      title: '',
      content: '',
      currentPeople: 0,
      maxPeople: 0,
      postSkills: [],
    },
    validator: postFormValidator,
    onSubmit: createPostSubmit,
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
              isClickValueText
              placeholder={`현재 인원 : ${values.currentPeople}`}
              items={peopleNumber}
              clickItem={handleCurrentPeopleChange}
            />
            <Dropdown
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

export default CreatePostTemplate;
