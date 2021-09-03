import React from 'react';
import * as Style from './styled';
import Label, { LabelProps } from '../../atom/Label/index';
import TextArea, { TextAreaProps } from '../../atom/TextArea';
import { SortDirectionType } from '../../@types/index';

export interface TextAreaFieldProps {
  group?: string;
  ariaLabel?: string;
  labelProps: LabelProps;
  textareaProps: TextAreaProps;
  sortDirection?: SortDirectionType;
}

function TextAreaField({
  ariaLabel = '',
  group = '',
  labelProps,
  textareaProps,
  sortDirection = 'row',
}: TextAreaFieldProps) {
  return (
    <Style.Container aria-label={ariaLabel} sortDirection={sortDirection}>
      <Label {...labelProps} group={group} />
      <TextArea {...textareaProps} id={group} />
    </Style.Container>
  );
}

export default TextAreaField;
