import React from 'react';
import * as Style from './styled';
import Label, { LabelProps } from '../../atom/Label/index';
import Input, { InputProps } from '../../atom/Input';
import { SortDirectionType } from '../../@types/index';

interface InputFieldProps {
  labelProps: LabelProps;
  inputProps: InputProps;
  sortDirection?: SortDirectionType;
}

function InputField({ labelProps, inputProps, sortDirection = 'row' }: InputFieldProps) {
  return (
    <Style.Container sortDirection={sortDirection}>
      <Label {...labelProps} />
      <Input {...inputProps} />
    </Style.Container>
  );
}

export default InputField;
