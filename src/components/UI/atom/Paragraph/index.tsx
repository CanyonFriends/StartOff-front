import React from 'react';
import * as Style from './styled';
import { SizeType } from '../../@types';

export interface ParagraphProps {
  content: string;
  size: SizeType;
}

function Paragraph({ content, size }: ParagraphProps) {
  return <Style.Paragraph size={size}>{content}</Style.Paragraph>;
}

export default Paragraph;
