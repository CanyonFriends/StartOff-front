import React from 'react';
import Markdown from 'markdown-to-jsx';
import * as Style from './styled';
import { Textarea } from '../../atom';

interface PostMarkdownFormProps {
  markdown: string;
  handleChangeMarkdownText: (markdown: string) => void;
}

function PostMarkdownForm({ handleChangeMarkdownText, markdown }: PostMarkdownFormProps) {
  const changeMarkdown = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChangeMarkdownText(event.target.value);
  };

  return (
    <>
      <Style.Header>
        <span>Write</span>
        <span>Preview</span>
      </Style.Header>
      <Style.Container>
        <Style.TextareaContainer>
          <Textarea ariaLabel="markdown-textarea" value={markdown} onChange={changeMarkdown} />
        </Style.TextareaContainer>
        <Style.MarkdownContainer>
          <Markdown>{markdown}</Markdown>
        </Style.MarkdownContainer>
      </Style.Container>
    </>
  );
}

export default PostMarkdownForm;
