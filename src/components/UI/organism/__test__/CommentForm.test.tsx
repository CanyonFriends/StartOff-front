/**
 * @jest-environment jsdom
 */
import React from 'react';
import { waitFor, fireEvent } from '@testing-library/react';
import { render } from '../../../../test-utils';
import CommentForm from '../CommentForm';

describe('Component/Organism/CommentForm', () => {
  const handleSubmit = async () => '';

  it('댓글 글자가 5자리 이하일 경우 에러 발생', async () => {
    const component = render(<CommentForm handleSubmit={handleSubmit} />);

    const submitButton = component.getByText('작성');
    fireEvent.click(submitButton);
    await component.findByText('댓글은 다섯글자 이상을 입력해야합니다');
    const closeModalButton = await component.findByText('닫기');
    fireEvent.click(closeModalButton);
  });

  it('댓글 작성', async () => {
    let text = '';
    const handleSubmit = async () => {
      text = 'shellboy';
      return '';
    };
    const component = render(<CommentForm handleSubmit={handleSubmit} />);

    const submitButton = component.getByText('작성');
    const commentTextArea = component.getByLabelText('comment-textarea');
    fireEvent.change(commentTextArea, { target: { value: 'commeeentt' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(text).toBe('shellboy');
    });
  });

  it('댓글 작성 에러', async () => {
    const handleSubmit = async () => 'error';
    const component = render(<CommentForm handleSubmit={handleSubmit} />);

    const submitButton = component.getByText('작성');
    const commentTextArea = component.getByLabelText('comment-textarea');
    fireEvent.change(commentTextArea, { target: { value: 'commeeentt' } });
    fireEvent.click(submitButton);

    await component.findByText('error');
    const closeModalButton = await component.findByText('닫기');
    fireEvent.click(closeModalButton);
  });
});
