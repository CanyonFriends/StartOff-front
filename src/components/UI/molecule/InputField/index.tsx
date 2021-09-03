import React from 'react';
import * as Style from './styled';
import Label, { LabelProps } from '../../atom/Label/index';
import Input, { InputProps } from '../../atom/Input';
import { SortDirectionType } from '../../@types/index';

export interface InputFieldProps {
  group?: string;
  ariaLabel?: string;
  labelProps: LabelProps;
  inputProps: InputProps;
  sortDirection?: SortDirectionType;
}

function InputField({ ariaLabel = '', group = '', labelProps, inputProps, sortDirection = 'row' }: InputFieldProps) {
  return (
    <Style.Container aria-label={ariaLabel} sortDirection={sortDirection}>
      <Label {...labelProps} group={group} />
      <Input {...inputProps} id={group || inputProps.id} />
    </Style.Container>
  );
}

export default InputField;
