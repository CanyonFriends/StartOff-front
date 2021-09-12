/**
 * @jest-environment jsdom
 */
import React from 'react';
import { waitFor, fireEvent } from '@testing-library/react';
import { render } from '../../test-utils';
import CreatePost from '../PostChange/PostCreation';
import { getCategoriesAPI, createPostAPI } from '../../api/post';
import { getSkillsAPI } from '../../api/skill';
import { makeSkillMock } from '../../__mocks__/client-mock-data';
import * as Route from '../../Routes';

jest.mock('../../api/post');
jest.mock('../../api/skill');
const spyBuildBoardPath = jest.spyOn(Route, 'buildBoardPath');

const getCategoriesMockAPI = getCategoriesAPI as jest.MockedFunction<typeof getCategoriesAPI>;
const getSkillsMockAPI = getSkillsAPI as jest.MockedFunction<typeof getSkillsAPI>;
const createPostMockAPI = createPostAPI as jest.MockedFunction<typeof createPostAPI>;

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
});

describe('<CreatePost> 페이지', () => {
  it('snapshot 체크', async () => {
    const component = render(<CreatePost />);
    await waitFor(() => expect(component.container).toMatchSnapshot());
  });

  it('getTotalSkills 에러 발생', async () => {
    getSkillsMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));

    const component = render(<CreatePost />);
    await waitFor(() => {
      component.getByText('error');
      const modalCloseButton = component.getByText('닫기');
      fireEvent.click(modalCloseButton);
      expect(spyBuildBoardPath).toBeCalledTimes(1);
    });
  });

  it('포스트 생성', async () => {
    createPostMockAPI.mockReturnValue(new Promise((res) => res(true)));
    const component = render(<CreatePost />);

    const titleInput = component.getByLabelText('title');
    const contentTextarea = component.getByLabelText('markdown-textarea');

    fireEvent.change(titleInput, { target: { value: 'this is title' } });
    fireEvent.change(contentTextarea, { target: { value: 'this is content' } });

    const submitButton = component.getByText('글 쓰기');
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(createPostMockAPI).toBeCalledTimes(1);
    });
  });

  it('포스트 생성 시 에러 발생', async () => {
    createPostMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
    const component = render(<CreatePost />);

    const titleInput = component.getByLabelText('title');
    const contentTextarea = component.getByLabelText('markdown-textarea');

    fireEvent.change(titleInput, { target: { value: 'this is title' } });
    fireEvent.change(contentTextarea, { target: { value: 'this is content' } });

    const submitButton = component.getByText('글 쓰기');
    fireEvent.click(submitButton);
    await waitFor(() => {
      component.getByText('error');
    });
  });

  it('dropdown 변경 테스트', async () => {
    const component = render(<CreatePost />);

    const currentPeopleDropbox = component.getByText('현재 인원 : 0');
    fireEvent.click(currentPeopleDropbox);
    await waitFor(() => {
      const tenPeople = component.getByText('10');
      fireEvent.click(tenPeople);
    });

    const maxPeopleDropbox = component.getByText('모집 인원 : 0');
    fireEvent.click(maxPeopleDropbox);
    await waitFor(() => {
      const tenPeople = component.getByText('10');
      fireEvent.click(tenPeople);
    });
  });

  it('skill 변경 테스트', async () => {
    const component = render(<CreatePost />);

    const skillDropdown = component.getByText('스택 추가');
    fireEvent.click(skillDropdown);
    const javascriptSkill = await component.findByText('javascript');
    fireEvent.click(javascriptSkill);

    await component.findByText('javascript');
    const deleteSkillButton = await component.findByText('x');
    fireEvent.click(deleteSkillButton);
  });
});
