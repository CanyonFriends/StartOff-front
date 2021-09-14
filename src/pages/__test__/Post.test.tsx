/**
 * @jest-environment jsdom
 */
import React from 'react';
import { waitFor, fireEvent } from '@testing-library/react';
import { render } from '../../test-utils';
import Post from '../Post';
import { getCategoriesAPI, getPostAPI, deletePostAPI } from '../../api/post';
import { makeCommentMock, makePostMock } from '../../__mocks__/client-mock-data';
import * as Routes from '../../Routes';
import { deleteCommentAPI, createCommentAPI, updateCommentAPI } from '../../api/comment';

jest.mock('../../api/post');
jest.mock('../../api/comment');
const spyBuildBoardPath = jest.spyOn(Routes, 'buildBoardPath');
const spyBuildModifyPath = jest.spyOn(Routes, 'buildModifyPath');

const getCategoriesMockAPI = getCategoriesAPI as jest.MockedFunction<typeof getCategoriesAPI>;
const getPostMockAPI = getPostAPI as jest.MockedFunction<typeof getPostAPI>;
const deletePostMockAPI = deletePostAPI as jest.MockedFunction<typeof deletePostAPI>;
const deleteCommentMockAPI = deleteCommentAPI as jest.MockedFunction<typeof deleteCommentAPI>;
const createCommentMockAPI = createCommentAPI as jest.MockedFunction<typeof createCommentAPI>;
const updateCommentMockAPI = updateCommentAPI as jest.MockedFunction<typeof updateCommentAPI>;

const postMock = makePostMock({ userId: '', comments: [makeCommentMock({ userId: '' })] });
beforeEach(() => {
  jest.resetAllMocks();
  getCategoriesMockAPI.mockReturnValue(new Promise((res) => res([])));
  getPostMockAPI.mockReturnValue(new Promise((res) => res(postMock)));
});

describe('<Post> 페이지', () => {
  it('snapshot 체크', async () => {
    const component = render(<Post />);
    await waitFor(() => expect(component.container).toMatchSnapshot());
  });

  describe('post', () => {
    it('렌더링(수정 가능)', async () => {
      const component = render(<Post />);

      await component.findByText(postMock.title);
      await component.findByText(postMock.content);
      await component.findByText(`${postMock.currentPeople} / ${postMock.maxPeople}`);
      await component.findByText(postMock.postSkills[0].skillName);
    });

    it('렌더링 에러', async () => {
      getPostMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
      render(<Post />);

      await waitFor(() => {
        expect(spyBuildBoardPath).toBeCalledTimes(1);
      });
    });

    it('delete 포스트', async () => {
      deletePostMockAPI.mockReturnValue(new Promise((res) => res(true)));
      const component = render(<Post />);

      const deleteButton = await component.findByText('삭제하기');
      fireEvent.click(deleteButton);
      await waitFor(() => {
        expect(spyBuildBoardPath).toBeCalledTimes(1);
        expect(spyBuildBoardPath).toBeCalledWith(postMock.category);
      });
    });

    it('delete 포스트 시 에러 발생', async () => {
      deletePostMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
      const component = render(<Post />);

      const deleteButton = await component.findByText('삭제하기');
      fireEvent.click(deleteButton);
      await waitFor(() => {
        expect(spyBuildBoardPath).toBeCalledTimes(0);
      });
    });

    it('modify 포스트', async () => {
      const component = render(<Post />);

      const modifyButton = await component.findByText('수정하기');
      fireEvent.click(modifyButton);
      await waitFor(() => {
        expect(spyBuildModifyPath).toBeCalledTimes(1);
      });
    });
  });

  describe('comment', () => {
    it('delete 댓글', async () => {
      deleteCommentMockAPI.mockReturnValue(new Promise((res) => res(true)));
      const component = render(<Post />);

      await waitFor(() => {
        const deleteCommentButton = component.getByText('삭제');
        fireEvent.click(deleteCommentButton);
      });
    });

    it('delete 댓글 에러', async () => {
      deleteCommentMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
      const component = render(<Post />);

      await waitFor(() => {
        const deleteCommentButton = component.getByText('삭제');
        fireEvent.click(deleteCommentButton);

        component.getByText('error');
        const closeModalButton = component.getByText('닫기');
        fireEvent.click(closeModalButton);
      });
    });

    it('create 댓글', async () => {
      const mockComment = makeCommentMock({ content: 'new comment' });
      createCommentMockAPI.mockReturnValue(new Promise((res) => res(mockComment)));
      const component = render(<Post />);

      await waitFor(() => {
        const commentTextarea = component.getByLabelText('comment-textarea');
        const createCommentButton = component.getByText('작성');
        fireEvent.change(commentTextarea, { target: { value: 'new comment' } });
        fireEvent.click(createCommentButton);
      });
    });

    it('create 댓글 에러', async () => {
      createCommentMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
      const component = render(<Post />);

      await waitFor(() => {
        const commentTextarea = component.getByLabelText('comment-textarea');
        const createCommentButton = component.getByText('작성');
        fireEvent.change(commentTextarea, { target: { value: 'new comment' } });
        fireEvent.click(createCommentButton);
      });
      component.getByText('error');
      const closeButton = component.getByText('닫기');
      fireEvent.click(closeButton);
    });

    it('modify 댓글', async () => {
      const mockComment = makeCommentMock({ content: 'new comment' });
      updateCommentMockAPI.mockReturnValue(new Promise((res) => res(mockComment)));
      const component = render(<Post />);

      await waitFor(() => {
        const editButton = component.getByText('수정');
        fireEvent.click(editButton);
        const saveButton = component.getByText('저장');
        fireEvent.click(saveButton);
      });
      component.getByText('new comment');
    });

    it('modify 댓글 에러', async () => {
      updateCommentMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
      const component = render(<Post />);

      await waitFor(() => {
        const editButton = component.getByText('수정');
        fireEvent.click(editButton);
        const saveButton = component.getByText('저장');
        fireEvent.click(saveButton);
      });
      component.getByText('error');
      const closeButton = component.getByText('닫기');
      fireEvent.click(closeButton);
      // await waitFor(() => {});
    });
  });
});
