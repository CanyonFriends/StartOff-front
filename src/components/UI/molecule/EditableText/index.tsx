import React from 'react';
import { Input, Paragraph, Textarea, Title } from '../../atom';
import { TextType } from '../../@types/index';
import { InputProps } from '../../atom/Input/index';
import { TitleProps } from '../../atom/Title';
import { TextAreaProps } from '../../atom/TextArea';
import { ParagraphProps } from '../../atom/Paragraph';

interface EditableTextProps {
  isEditable: boolean;
  textType: TextType;
  paragraphProps?: ParagraphProps;
  titleProps?: TitleProps;
  inputProps?: InputProps;
  textareaProps?: TextAreaProps;
}

function EditableText({
  isEditable,
  paragraphProps,
  titleProps,
  textType,
  inputProps,
  textareaProps,
}: EditableTextProps) {
  const Component =
    textType === 'title' ? (
      <Title {...titleProps}>{inputProps?.value || textareaProps?.value}</Title>
    ) : (
      <Paragraph {...paragraphProps} content={inputProps?.value || textareaProps?.value || ''} />
    );

  if (!isEditable) return Component;
  if (inputProps) return <Input {...inputProps} />;
  if (textareaProps) return <Textarea {...textareaProps} />;
  return <></>;
}

export default EditableText;
