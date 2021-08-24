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

export interface ProfileInfoCardProps {
  editableAuthority: boolean;
  title: string;
  textValue: string;
  iconType: IconType;
  handleSubmit: (data: ModifyProfileInfoCardType) => Promise<string>;
}

function ProfileInfoCard({ editableAuthority, title, textValue, iconType, handleSubmit }: ProfileInfoCardProps) {
  const [isEditable, setIsEditable] = useState(false);
  const { values, error, clearError, handleChange, handleSubmitWithErrorControl } = useForm<ModifyProfileInfoCardType>({
    onSubmit: handleSubmit,
    initialState: { textValue },
    validator: modifyProfileInfoCard,
  });

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsEditable(!isEditable);
    if (!isEditable) return;

    const result = await handleSubmitWithErrorControl(event);
    if (!result) setIsEditable(true);
  };

  const handleTextValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange({ textValue: event.target.value });
  };

  const closeModal = () => {
    clearError();
  };

  const modifyIconProps: IconProps = {
    icon: isEditable ? 'Disk' : 'Pencil',
  };
  const signatureIconProps: IconProps = {
    icon: iconType,
  };
  const inputProps: InputProps = {
    value: values.textValue,
    onChange: handleTextValueChange,
  };

  return (
    <Style.Container onSubmit={handleFormSubmit}>
      {error && <AlertModal content={error} clickCloseButton={closeModal} />}
      {editableAuthority ? (
        <BoxWithIcon isIconButton iconPosition="right" iconProps={modifyIconProps}>
          <Title fontsize="h3">{title}</Title>
        </BoxWithIcon>
      ) : (
        <Title fontsize="h3">{title}</Title>
      )}
      <BoxWithIcon isContinuous iconProps={signatureIconProps}>
        <EditableText isEditable={isEditable} textType="paragraph" inputProps={inputProps} />
      </BoxWithIcon>
    </Style.Container>
  );
}

export default ProfileInfoCard;
