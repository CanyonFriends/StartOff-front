import React from 'react';
import * as Style from './styled';
import { SizeType } from '../../@types/index';

export interface TextAreaProps {
  value: string;
  id?: string;
  ariaLabel?: string;
  placeholder?: string;
  name?: string;
  size?: SizeType;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextArea({ id = '', ariaLabel = '', placeholder = '', name = '', size = 'medium', ...props }: TextAreaProps) {
  return <Style.TextArea aria-label={ariaLabel} id={id} size={size} name={name} placeholder={placeholder} {...props} />;
}

export default TextArea;
