import React, { useState } from 'react';
import * as Style from './styled';
import { EditableText } from '../../molecule';
import { Button } from '../../atom';
import useForm from '../../../../hooks/useForm';
import { InputProps } from '../../atom/Input/index';
import modifyProfileIntroduceValidator, {
  ModifyProfileIntroduceType,
} from '../../../../validator/modifyProfileIntroduce';
import AlertModal from '../AlertModal';

interface ProfileIntroduceProps {
  editableAuthority: boolean;
  nickname: string;
  introduce: string;
  imageurl: string;
  isEditable?: boolean;
  handleSubmit: (data: ModifyProfileIntroduceType) => Promise<string>;
}

function ProfileIntroduce({
  editableAuthority,
  isEditable,
  nickname,
  introduce,
  imageurl,
  handleSubmit,
}: ProfileIntroduceProps) {
  const [editable, setEditable] = useState<boolean>(!!isEditable);
  const { values, error, clearError, handleChange, handleSubmitWithErrorControl } = useForm<ModifyProfileIntroduceType>(
    {
      onSubmit: handleSubmit,
      initialState: { imageurl, nickname, introduce },
      validator: modifyProfileIntroduceValidator,
    },
  );

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEditable(!editable);
    if (!editable) return;

    const result = await handleSubmitWithErrorControl(event);
    if (!result) setEditable(true);
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 10) return;
    handleChange({ ...values, nickname: event.target.value });
  };

  const handleIntroduceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 50) return;
    handleChange({ ...values, introduce: event.target.value });
  };

  const nicknameInfo: InputProps = {
    value: values.nickname,
    onChange: handleNicknameChange,
    size: 'extraLarge',
    placeholder: '별명을 입력해주세요',
  };
  const introduceInfo: InputProps = {
    value: values.introduce,
    onChange: handleIntroduceChange,
    placeholder: '자기소개를 입력해주세요 (50자)',
  };

  const closeModal = () => {
    clearError();
  };

  return (
    <Style.Form onSubmit={handleFormSubmit}>
      {error && <AlertModal content={error} clickCloseButton={closeModal} />}
      <Style.Top>
        <Style.DummyImage />
        <Style.NicknameWrapper>
          <EditableText isEditable={editable} textType="title" inputProps={nicknameInfo} />
        </Style.NicknameWrapper>
        {editableAuthority && <Button size="medium">{editable ? '저장' : '수정'}</Button>}
      </Style.Top>
      <Style.Bottom>
        <EditableText isEditable={editable} textType="paragraph" inputProps={introduceInfo} />
      </Style.Bottom>
    </Style.Form>
  );
}

export default ProfileIntroduce;
