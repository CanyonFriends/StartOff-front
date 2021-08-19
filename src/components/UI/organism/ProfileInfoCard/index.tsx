import React, { useState } from 'react';
import * as Style from './styled';
import useForm from '../../../../hooks/useForm';
import { BoxWithIcon, EditableText } from '../../molecule';
import { Title } from '../../atom';
import { IconProps } from '../../atom/Icon';
import { InputProps } from '../../atom/Input';
import { IconType } from '../../@types/index';
import modifyProfileInfoCard, { ModifyProfileInfoCardType } from '../../../../validator/modifyProfileInfoCard';
import { AlertModal } from '..';

interface ProfileInfoCardProps {
  title: string;
  textValue: string;
  iconType: IconType;
  handleSubmit: (data: ModifyProfileInfoCardType) => Promise<string>;
}

function ProfileInfoCard({ title, textValue, iconType, handleSubmit }: ProfileInfoCardProps) {
  const [isEditable, setIsEditable] = useState(false);
  const { values, error, clearError, handleChange, handleSubmitWithErrorControl } = useForm<ModifyProfileInfoCardType>({
    onSubmit: handleSubmit,
    initialState: { textValue },
    validator: modifyProfileInfoCard,
  });

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  const handleTextValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange({ textValue: event.target.value });
  };

  const closeModal = () => {
    clearError();
  };

  const modifyIconProps: IconProps = {
    icon: isEditable ? 'Disk' : 'Pencil',
    onClick: toggleEditable,
  };
  const signatureIconProps: IconProps = {
    icon: iconType,
  };
  const inputProps: InputProps = {
    value: values.textValue,
    onChange: handleTextValueChange,
  };

  return (
    <Style.Container onSubmit={handleSubmitWithErrorControl}>
      {error && <AlertModal content={error} clickCloseButton={closeModal} />}
      <BoxWithIcon iconPosition="right" iconProps={modifyIconProps}>
        <Title fontsize="h2">{title}</Title>
      </BoxWithIcon>
      <BoxWithIcon isContinuous iconProps={signatureIconProps}>
        <EditableText isEditable={isEditable} textType="paragraph" inputProps={inputProps} />
      </BoxWithIcon>
    </Style.Container>
  );
}

export default ProfileInfoCard;
