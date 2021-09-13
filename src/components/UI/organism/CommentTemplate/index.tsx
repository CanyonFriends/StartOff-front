import React, { useState } from 'react';
import { CommentClientType } from '../../../../@types/client';
import { Button } from '../../atom';
import { EditableText } from '../../molecule';
import * as Style from './styled';
import { dateToString } from '../../../../utils/date';
import { TextAreaProps } from '../../atom/TextArea';

interface CommentTemplateProps {
  comment: CommentClientType;
  editableAuthority: boolean;
}

function CommentTemplate({ comment, editableAuthority }: CommentTemplateProps) {
  const [commentEditable, setCommentEditable] = useState(false);

  const toggleCommentEditable = () => {
    setCommentEditable(!commentEditable);
  };

  const handleContentChange = () => {};

  const textareaProps: TextAreaProps = {
    ariaLabel: 'comment-edit-textarea',
    value: comment.content,
    onChange: handleContentChange,
  };
  return (
    <Style.Container>
      <Style.Info>
        <Style.NicknameWrapper>{comment.nickname}</Style.NicknameWrapper>
        <Style.DateWrapper>{dateToString(comment.createdAt)}</Style.DateWrapper>
        {editableAuthority && !commentEditable ? (
          <>
            <Button formButton={false} onClick={toggleCommentEditable}>
              수정
            </Button>
            <Button formButton={false} theme="secondary">
              삭제
            </Button>
          </>
        ) : (
          <></>
        )}
      </Style.Info>
      <EditableText
        isEditable={commentEditable}
        textType="paragraph"
        paragraphProps={{ size: 'medium', content: '' }}
        textareaProps={textareaProps}
      />
      {commentEditable ? <Button>저장</Button> : <></>}
    </Style.Container>
  );
}

export default CommentTemplate;
