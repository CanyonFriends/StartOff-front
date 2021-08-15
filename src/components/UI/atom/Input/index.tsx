import React from 'react';
import * as Style from './styled';
import { InputType } from '../../@types/index';

export interface InputProps {
  value: string;
  id?: string;
  placeholder?: string;
  type?: InputType;
  name?: string;
  width?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ id = '', placeholder = '', type = 'text', name = '', width = '100%', ...props }: InputProps) {
  return (
    <Style.InputTag
      id={id}
      aria-label={id}
      name={name}
      placeholder={placeholder}
      type={type}
      width={width}
      {...props}
    />
  );
}

export default Input;
