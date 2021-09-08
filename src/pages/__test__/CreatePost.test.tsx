/**
 * @jest-environment jsdom
 */
import React from 'react';
import { waitFor } from '@testing-library/react';
import { render } from '../../test-utils';
import CreatePost from '../CreatePost';
import { getCategoriesAPI } from '../../api/post';

jest.mock('../../api/post');

const getCategoriesMockAPI = getCategoriesAPI as jest.MockedFunction<typeof getCategoriesAPI>;

beforeEach(() => {
  jest.resetAllMocks();
  getCategoriesMockAPI.mockReturnValue(new Promise((res) => res([])));
});

describe('<CreatePost> 페이지', () => {
  it('snapshot 체크', async () => {
    const component = render(<CreatePost />);
    await waitFor(() => expect(component.container).toMatchSnapshot());
  });
});
