import React from 'react';
import * as Style from './styled';

interface TextAreaProps {
<<<<<<< HEAD
  value: string;
=======
>>>>>>> e60cf4174859cc4fde4fb32b10471d2c633f6008
  id?: string;
  placeholder?: string;
  name?: string;
  cols?: number;
  rows?: number;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextArea({ id = '', placeholder = '', name = '', cols = 20, rows = 20, ...props }: TextAreaProps) {
  return <Style.TextArea id={id} name={name} placeholder={placeholder} cols={cols} rows={rows} {...props} />;
}

export default TextArea;
