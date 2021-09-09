/**
 * @jest-environment jsdom
 */
import React from 'react';
import { waitFor } from '@testing-library/react';
import { render } from '../../test-utils';
import Post from '../Post';
import { getCategoriesAPI, getPostAPI } from '../../api/post';
import { makePostMock } from '../../__mocks__/client-mock-data';

jest.mock('../../api/post');

const getCategoriesMockAPI = getCategoriesAPI as jest.MockedFunction<typeof getCategoriesAPI>;
const getPostMockAPI = getPostAPI as jest.MockedFunction<typeof getPostAPI>;

beforeEach(() => {
  jest.resetAllMocks();
  getCategoriesMockAPI.mockReturnValue(new Promise((res) => res([])));
  getPostMockAPI.mockReturnValue(new Promise((res) => res(makePostMock({ nickname: undefined }))));
});

describe('<Post> 페이지', () => {
  it('snapshot 체크', async () => {
    const component = render(<Post />);
    await waitFor(() => expect(component.container).toMatchSnapshot());
  });
});
