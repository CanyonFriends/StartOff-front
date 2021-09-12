import React from 'react';
import * as Style from './styled';
import useForm from '../../../../hooks/useForm';
import commentValidator from '../../../../validator/commentValidator';
import TextArea, { TextAreaProps } from '../../atom/TextArea';
import { Button } from '../../atom';
import { AlertModal } from '..';

interface CommentFormProps {
  handleSubmit: () => Promise<string>;
}

function CommentForm({ handleSubmit }: CommentFormProps) {
  const { values, error, clearError, handleChange, handleSubmitWithErrorControl } = useForm({
    initialState: {
      comment: '',
    },
    validator: commentValidator,
    onSubmit: handleSubmit,
  });

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange({ ...values, comment: event.target.value });
  };

  const commentTextarea: TextAreaProps = {
    value: values.comment,
    onChange: handleCommentChange,
  };

  const handleCloseModal = () => {
    clearError();
  };

  return (
    <>
      {!!error && <AlertModal content={error} clickCloseButton={handleCloseModal} />}
      <Style.Container onSubmit={handleSubmitWithErrorControl}>
        <TextArea ariaLabel="comment-textarea" size="medium" {...commentTextarea} />
        <Button width="150px" size="extraLarge">
          작성
        </Button>
      </Style.Container>
    </>
  );
}

export default CommentForm;
