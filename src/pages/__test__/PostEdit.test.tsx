/**
 * @jest-environment jsdom
 */
import React from 'react';
import { waitFor, fireEvent } from '@testing-library/react';
import { getCategoriesAPI, getPostAPI, updatePostAPI } from '../../api/post';
import { getSkillsAPI } from '../../api/skill';
import { render } from '../../test-utils';
import { makePostMock, makeSkillMock } from '../../__mocks__/client-mock-data';
import PostEdit from '../PostChange/PostEdit';

jest.mock('../../api/post');
jest.mock('../../api/skill');

const getCategoriesMockAPI = getCategoriesAPI as jest.MockedFunction<typeof getCategoriesAPI>;
const getSkillsMockAPI = getSkillsAPI as jest.MockedFunction<typeof getSkillsAPI>;
const getPostMockAPI = getPostAPI as jest.MockedFunction<typeof getPostAPI>;
const updatePostMockAPI = updatePostAPI as jest.MockedFunction<typeof updatePostAPI>;

const skillMockList = [
  makeSkillMock({ skillName: 'typescript' }),
  makeSkillMock({ skillName: 'javascript' }),
  makeSkillMock({ skillName: 'c#' }),
  makeSkillMock({ skillName: 'python' }),
];

beforeEach(() => {
  jest.resetAllMocks();
  getCategoriesMockAPI.mockReturnValue(new Promise((res) => res([])));
  getSkillsMockAPI.mockReturnValue(new Promise((res) => res(skillMockList)));
  getPostMockAPI.mockReturnValue(new Promise((res) => res(makePostMock({}))));
});

describe('<PostEdit> 페이지', () => {
  it('snapshot 체크', async () => {
    const component = render(<PostEdit />);

    await waitFor(() => expect(component.container).toMatchSnapshot());
  });

  it('getPost api 에러', async () => {
    getPostMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
    const component = render(<PostEdit />);

    await component.findByText('error');
    const closeModalButton = await component.findByText('닫기');
    fireEvent.click(closeModalButton);
  });

  it('getSkills api 에러', async () => {
    getSkillsMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
    const component = render(<PostEdit />);

    await component.findByText('error');
    const closeModalButton = await component.findByText('닫기');
    fireEvent.click(closeModalButton);
  });

  it('포스트 수정', async () => {
    updatePostMockAPI.mockReturnValue(new Promise((res) => res(true)));
    const component = render(<PostEdit />);

    const submitButton = await component.findByText('글 쓰기');
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(updatePostMockAPI).toBeCalledTimes(1);
    });
  });

  it('포스트 에러', async () => {
    updatePostMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
    const component = render(<PostEdit />);

    const submitButton = await component.findByText('글 쓰기');
    fireEvent.click(submitButton);
    await waitFor(() => {
      component.getByText('error');
    });
  });
});
