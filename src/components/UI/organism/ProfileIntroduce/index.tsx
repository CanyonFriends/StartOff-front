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

  const toggleEditable = () => {
    setEditable(!editable);
  };

  const clickSaveButton = () => {
    //
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange({ ...values, nickname: event.target.value });
  };

  const handleIntroduceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange({ ...values, introduce: event.target.value });
  };

  const nicknameInfo: InputProps = {
    value: values.nickname,
    onChange: handleNicknameChange,
    size: 'extraLarge',
  };
  const introduceInfo: InputProps = {
    value: values.introduce,
    onChange: handleIntroduceChange,
  };

  const closeModal = () => {
    clearError();
  };

  return (
    <Style.Form onSubmit={handleSubmitWithErrorControl}>
      {error && <AlertModal content={error} clickCloseButton={closeModal} />}
      <Style.Top>
        <Style.DummyImage />
        <Style.NicknameWrapper>
          <EditableText isEditable={editable} textType="title" inputProps={nicknameInfo} />
        </Style.NicknameWrapper>
        {editableAuthority && (
          <Button size="medium" onClick={editable ? clickSaveButton : toggleEditable}>
            {editable ? '저장' : '수정'}
          </Button>
        )}
      </Style.Top>
      <Style.Bottom>
        <EditableText isEditable={editable} textType="paragraph" inputProps={introduceInfo} />
      </Style.Bottom>
    </Style.Form>
  );
}

export default ProfileIntroduce;
