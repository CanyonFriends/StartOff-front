import React from 'react';
import * as Style from './styled';
import { Input, Title } from '../../atom';
import { TextType } from '../../@types/index';
import { InputProps } from '../../atom/Input/index';
import { TitleProps } from '../../atom/Title';

interface EditableTextProps {
  isEditable: boolean;
  textType: TextType;
  titleProps?: TitleProps;
  inputProps: InputProps;
}

function EditableText({ isEditable, titleProps, textType, inputProps }: EditableTextProps) {
  const Component =
    textType === 'title' ? (
      <Title {...titleProps}>{inputProps.value}</Title>
    ) : (
      <Style.Paragraph>{inputProps.value}</Style.Paragraph>
    );

  return isEditable ? <Input {...inputProps} /> : Component;
}

export default EditableText;
