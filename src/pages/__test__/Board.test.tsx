/**
 * @jest-environment jsdom
 */
import React from 'react';
import { waitFor, fireEvent } from '@testing-library/react';
import { render } from '../../test-utils';
import Board from '../Board';
import { getCategoriesAPI, getPostsAPI } from '../../api/post';
import { makeMockBoard } from '../../__mocks__/client-mock-data';

jest.mock('../../api/post');

const getPostsMockAPI = getPostsAPI as jest.MockedFunction<typeof getPostsAPI>;
const getCategoriesMockAPI = getCategoriesAPI as jest.MockedFunction<typeof getCategoriesAPI>;

beforeEach(() => {
  jest.resetAllMocks();
  getPostsMockAPI.mockReturnValue(new Promise((res) => res(makeMockBoard({}))));
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

  it('로그인 없이 글 쓰기 버튼 클릭 시 에러', async () => {
    const component = render(<Board />);

    await waitFor(() => {
      const createPostButton = component.getByText('글 쓰기');
      fireEvent.click(createPostButton);
    });

    await component.findByText('로그인이 필요합니다');
  });
});
