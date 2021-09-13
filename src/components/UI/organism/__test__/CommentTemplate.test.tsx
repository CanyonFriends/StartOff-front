/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../../test-utils';
import CommentTemplate from '../CommentTemplate';
import { makeCommentMock } from '../../../../__mocks__/client-mock-data';
import { dateToString } from '../../../../utils/date';

describe('Component/Organism/CommentTemplate', () => {
  const commentMock = makeCommentMock({});
  it('렌더링 테스트(수정 가능)', () => {
    const component = render(<CommentTemplate editableAuthority comment={commentMock} />);

    component.getByText('수정');
    component.getByText('삭제');
    component.getByText(commentMock.nickname);
    component.getByText(commentMock.content);
    component.getByText(dateToString(commentMock.createdAt));
  });

  it('수정 버튼 클릭', async () => {
    const component = render(<CommentTemplate editableAuthority comment={commentMock} />);

    const editButton = component.getByText('수정');
    fireEvent.click(editButton);
    await component.findByText('저장');
  });

  it('댓글 수정', async () => {
    const component = render(<CommentTemplate editableAuthority comment={commentMock} />);

    const editButton = component.getByText('수정');
    fireEvent.click(editButton);
    const commentTextarea = await component.findByLabelText('comment-edit-textarea');
    fireEvent.change(commentTextarea, { target: { value: 'new comment' } });
  });
});
