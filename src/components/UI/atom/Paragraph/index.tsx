import React from 'react';
import * as Style from './styled';
import { SizeType } from '../../@types';

export interface ParagraphProps {
  content: string;
  id?: string;
  size?: SizeType;
}

function Paragraph({ id = '', content, size = 'small' }: ParagraphProps) {
  return (
    <Style.Paragraph aria-label={id} size={size}>
      {content}
    </Style.Paragraph>
  );
}

export default Paragraph;
