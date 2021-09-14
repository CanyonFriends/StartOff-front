import React, { useState } from 'react';
import { CommentClientType } from '../../../../@types/client';
import { Button } from '../../atom';
import { EditableText } from '../../molecule';
import * as Style from './styled';
import { dateToString } from '../../../../utils/date';
import { TextAreaProps } from '../../atom/TextArea';
import useForm from '../../../../hooks/useForm';
import commentValidator, { CommentValidatorType } from '../../../../validator/commentValidator';
import { AlertModal } from '..';

interface CommentTemplateProps {
  comment: CommentClientType;
  editableAuthority: boolean;
  handleDelete: (commentId: string) => void;
  handleSubmitModify: (value: CommentValidatorType) => Promise<string>;
}

function CommentTemplate({ comment, editableAuthority, handleDelete, handleSubmitModify }: CommentTemplateProps) {
  const [commentEditable, setCommentEditable] = useState(false);
  const { values, handleChange, error, clearError, handleSubmitWithErrorControl } = useForm<CommentValidatorType>({
    initialState: { commentId: comment.commentId, comment: comment.content },
    validator: commentValidator,
    onSubmit: handleSubmitModify,
  });

  const toggleCommentEditable = () => {
    setCommentEditable(true);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange({ ...values, comment: event.target.value });
  };

  const handleClickDeleteButton = () => {
    handleDelete(comment.commentId);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    await handleSubmitWithErrorControl(event, () => setCommentEditable(false));
  };

  const handleCloseModal = () => {
    clearError();
  };

  const textareaProps: TextAreaProps = {
    ariaLabel: 'comment-edit-textarea',
    value: values.comment,
    onChange: handleContentChange,
  };
  return (
    <>
      {!!error && <AlertModal content={error} clickCloseButton={handleCloseModal} />}
      <Style.Container onSubmit={handleFormSubmit}>
        <Style.Info>
          <Style.NicknameWrapper>{comment.nickname}</Style.NicknameWrapper>
          <Style.DateWrapper>{dateToString(comment.createdAt)}</Style.DateWrapper>
          {editableAuthority && !commentEditable ? (
            <>
              <Button formButton={false} onClick={toggleCommentEditable}>
                수정
              </Button>
              <Button formButton={false} theme="secondary" onClick={handleClickDeleteButton}>
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
    </>
  );
}

export default CommentTemplate;
