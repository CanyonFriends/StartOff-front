/**
 * @jest-environment jsdom
 */
// TODO: Redux설정으로 로그인 여부시 테스트 필요
import React from 'react';
import { waitFor } from '@testing-library/react';
import { render } from '../../../test-utils';
import CommonHeader from '../CommonHeader';
import { getCategoriesAPI } from '../../../api/post';

jest.mock('../../../api/post');

const getCategoriesMockAPI = getCategoriesAPI as jest.MockedFunction<typeof getCategoriesAPI>;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Component/Layout/Overlay', () => {
  it('렌더링 테스트', async () => {
    getCategoriesMockAPI.mockReturnValue(new Promise((res) => res(['study', 'project'])));
    const component = render(<CommonHeader />);

    await waitFor(() => {
      component.getByText('study');
      component.getByText('project');
    });
  });

  it('getCategory API 실패', () => {
    getCategoriesMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
    render(<CommonHeader />);
  });
});
