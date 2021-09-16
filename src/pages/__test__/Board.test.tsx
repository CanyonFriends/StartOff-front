/**
 * @jest-environment jsdom
 */
import React from 'react';
import { waitFor, fireEvent } from '@testing-library/react';
import { render } from '../../test-utils';
import Board from '../Board';
import { getCategoriesAPI, getPostsAPI } from '../../api/post';
import { makeBoardMock } from '../../__mocks__/client-mock-data';
import * as Routes from '../../Routes';

jest.mock('../../api/post');
const spyBuildBoard = jest.spyOn(Routes, 'buildBoardPathWithQS');

const getPostsMockAPI = getPostsAPI as jest.MockedFunction<typeof getPostsAPI>;
const getCategoriesMockAPI = getCategoriesAPI as jest.MockedFunction<typeof getCategoriesAPI>;

beforeEach(() => {
  jest.resetAllMocks();
  getPostsMockAPI.mockReturnValue(new Promise((res) => res(makeBoardMock({ totalPages: 3 }))));
  getCategoriesMockAPI.mockReturnValue(new Promise((res) => res([])));
});

describe('<Board> 페이지', () => {
  it('snapshot 체크', async () => {
    const component = render(<Board />);
    await waitFor(() => expect(component.container).toMatchSnapshot());
  });

  it('렌더링 테스트', async () => {
    const component = render(<Board />);

    await waitFor(() => {
      component.getByText('글 쓰기');
      component.getByText('검색');
    });
  });

  it('getPost 실패', async () => {
    getPostsMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
    const component = render(<Board />);

    await waitFor(() => {
      component.getByText('게시글을 불러오는데 실패하였습니다');
    });
  });

  it('로그인 없이 글 쓰기 버튼 클릭 시 에러', async () => {
    const component = render(<Board />);

    await waitFor(() => {
      const createPostButton = component.getByText('글 쓰기');
      fireEvent.click(createPostButton);
    });

    await component.findByText('로그인이 필요합니다');
  });

  it('pagination 함수 테스트', async () => {
    const component = render(<Board />);
    await waitFor(() => {
      const secondPageButton = component.getByText('2');
      fireEvent.click(secondPageButton);
      expect(spyBuildBoard).toBeCalledTimes(1);
    });
  });

  it('생성하기 버튼 클릭 시 에러(로그인 x)', async () => {
    const component = render(<Board />);
    await waitFor(() => {
      const createButton = component.getByText('글 쓰기');
      fireEvent.click(createButton);
      component.getByText('로그인이 필요합니다');

      const clostModalButton = component.getByText('닫기');
      fireEvent.click(clostModalButton);
    });
  });

  it('검색하기', async () => {
    const component = render(<Board />);

    await waitFor(() => {
      const searchButton = component.getByText('검색');
      fireEvent.click(searchButton);
    });
  });
});
