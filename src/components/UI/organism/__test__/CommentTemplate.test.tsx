/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../../../test-utils';
import CommentTemplate from '../CommentTemplate';
import { makeCommentMock } from '../../../../__mocks__/client-mock-data';
import { dateToString } from '../../../../utils/date';

describe('Component/Organism/CommentTemplate', () => {
  const commentMock = makeCommentMock({});
  const handleDelete = () => {};
  const handleModify = async () => '';

  it('렌더링 테스트(수정 가능)', () => {
    const component = render(
      <CommentTemplate
        editableAuthority
        comment={commentMock}
        handleDelete={handleDelete}
        handleSubmitModify={handleModify}
      />,
    );

    component.getByText('수정');
    component.getByText('삭제');
    component.getByText(commentMock.nickname);
    component.getByText(commentMock.content);
    component.getByText(dateToString(commentMock.createdAt));
  });

  it('수정 버튼 클릭', async () => {
    const component = render(
      <CommentTemplate
        editableAuthority
        comment={commentMock}
        handleDelete={handleDelete}
        handleSubmitModify={handleModify}
      />,
    );

    const editButton = component.getByText('수정');
    fireEvent.click(editButton);
    await component.findByText('저장');
  });

  it('댓글 수정', async () => {
    const component = render(
      <CommentTemplate
        editableAuthority
        comment={commentMock}
        handleDelete={handleDelete}
        handleSubmitModify={handleModify}
      />,
    );

    const editButton = component.getByText('수정');
    fireEvent.click(editButton);
    const commentTextarea = await component.findByLabelText('comment-edit-textarea');
    fireEvent.change(commentTextarea, { target: { value: 'new comment' } });
  });

  it('댓글 삭제', async () => {
    let id = '';
    const handleDelete = (commentId: string) => {
      id = commentId;
    };
    const component = render(
      <CommentTemplate
        editableAuthority
        comment={commentMock}
        handleDelete={handleDelete}
        handleSubmitModify={handleModify}
      />,
    );

    const deleteButton = component.getByText('삭제');
    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(id).toBe(commentMock.commentId);
    });
  });

  it('수정 버튼 클릭 후 저장', async () => {
    const component = render(
      <CommentTemplate
        editableAuthority
        comment={commentMock}
        handleDelete={handleDelete}
        handleSubmitModify={handleModify}
      />,
    );

    const editButton = component.getByText('수정');
    fireEvent.click(editButton);
    const saveButton = await component.findByText('저장');
    fireEvent.click(saveButton);
    await component.findByText('수정');
  });

  it('저장 시 에러 발생', async () => {
    const handleModify = async () => 'error';
    const component = render(
      <CommentTemplate
        editableAuthority
        comment={commentMock}
        handleDelete={handleDelete}
        handleSubmitModify={handleModify}
      />,
    );

    const editButton = component.getByText('수정');
    fireEvent.click(editButton);
    const saveButton = await component.findByText('저장');
    fireEvent.click(saveButton);

    await component.findByText('error');
    const closeButton = await component.findByText('닫기');
    fireEvent.click(closeButton);
  });
});
