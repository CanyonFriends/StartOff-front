import React from 'react';
import * as Style from './styled';
import { SizeType } from '../../@types/index';

export interface TextAreaProps {
  value: string;
  id?: string;
  placeholder?: string;
  name?: string;
  cols?: number;
  rows?: number;
  size?: SizeType;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextArea({
  id = '',
  placeholder = '',
  name = '',
  cols = 20,
  rows = 20,
  size = 'medium',
  ...props
}: TextAreaProps) {
  return (
    <Style.TextArea id={id} size={size} name={name} placeholder={placeholder} cols={cols} rows={rows} {...props} />
  );
}

export default TextArea;
