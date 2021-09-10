/**
 * @jest-environment jsdom
 */
import React from 'react';
import { waitFor, fireEvent } from '@testing-library/react';
import { render } from '../../test-utils';
import Post from '../Post';
import { getCategoriesAPI, getPostAPI, deletePostAPI } from '../../api/post';
import { makePostMock } from '../../__mocks__/client-mock-data';
import * as Routes from '../../Routes';

jest.mock('../../api/post');
const spyBuildBoardPath = jest.spyOn(Routes, 'buildBoardPath');
const spyBuildModifyPath = jest.spyOn(Routes, 'buildModifyPath');

const getCategoriesMockAPI = getCategoriesAPI as jest.MockedFunction<typeof getCategoriesAPI>;
const getPostMockAPI = getPostAPI as jest.MockedFunction<typeof getPostAPI>;
const deletePostMockAPI = deletePostAPI as jest.MockedFunction<typeof deletePostAPI>;

const postMock = makePostMock({ userId: '' });
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
});
