/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../test-utils';
import ProfilePage from '../Profile';
import { getProfileAPI, updateProfileIntroduce, updateGithubIntroduce, updateBlogIntroduce } from '../../api/profile';
import { getSkillsAPI } from '../../api/skill';
import { makeProfileMock, makeSkillMock } from '../../__mocks__/client-mock-data';
import { dateToString } from '../../utils/date';
import { updatePasswordAPI } from '../../api/user';

jest.mock('../../api/user');
jest.mock('../../api/profile');
jest.mock('../../api/skill');

const updatePassworMociAPI = updatePasswordAPI as jest.MockedFunction<typeof updatePasswordAPI>;
const getProfileMockAPI = getProfileAPI as jest.MockedFunction<typeof getProfileAPI>;
const getSkillsMockAPI = getSkillsAPI as jest.MockedFunction<typeof getSkillsAPI>;
const updateProfileIntroduceMockAPI = updateProfileIntroduce as jest.MockedFunction<typeof updateProfileIntroduce>;
const updateGithubIntroduceMock = updateGithubIntroduce as jest.MockedFunction<typeof updateGithubIntroduce>;
const updateBlogIntroduceMock = updateBlogIntroduce as jest.MockedFunction<typeof updateBlogIntroduce>;

const profileMock = makeProfileMock({});
const skillMockList = [
  makeSkillMock({ skillName: 'typescript' }),
  makeSkillMock({ skillName: 'javascript' }),
  makeSkillMock({ skillName: 'c#' }),
  makeSkillMock({ skillName: 'python' }),
];

beforeEach(() => {
  jest.resetAllMocks();
  getProfileMockAPI.mockReturnValue(new Promise((res) => res(profileMock)));
  getSkillsMockAPI.mockReturnValue(new Promise((res) => res(skillMockList)));
});

describe('<Profile> 페이지', () => {
  it('snapshot 체크', async () => {
    const component = render(<ProfilePage />);
    await waitFor(() => expect(component.container).toMatchSnapshot());
  });

  describe('비밀번호 변경 기능', () => {
    it('비밀번호 변경 모달 렌더링', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modalButton = component.getByText('계정 정보 변경');
        fireEvent.click(modalButton);

        const currentPasswordInput = component.getByLabelText('currentpw') as HTMLInputElement;
        const afterPasswirdInput = component.getByLabelText('afterpw') as HTMLInputElement;
        const confirmPasswordinput = component.getByLabelText('confirmpw') as HTMLInputElement;
        expect(currentPasswordInput.value).toBe('');
        expect(afterPasswirdInput.value).toBe('');
        expect(confirmPasswordinput.value).toBe('');
      });
    });

    it('비밀번호 변경', async () => {
      updatePassworMociAPI.mockReturnValue(new Promise((res) => res(true)));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modalButton = component.getByText('계정 정보 변경');
        fireEvent.click(modalButton);

        const currentPasswordInput = component.getByLabelText('currentpw');
        const afterPasswirdInput = component.getByLabelText('afterpw');
        const confirmPasswordinput = component.getByLabelText('confirmpw');

        fireEvent.change(currentPasswordInput, { target: { value: `currentpassword` } });
        fireEvent.change(afterPasswirdInput, { target: { value: `afterpassword` } });
        fireEvent.change(confirmPasswordinput, { target: { value: `confirmpassword` } });
      });
    });
  });

  describe('introduce기능', () => {
    it('렌더링', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        component.getByText(profileMock.nickname);
        component.getByText(profileMock.introduce);
      });
    });

    it('수정버튼 클릭 시 전환', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modifyButton = component.getByText('수정');
        fireEvent.click(modifyButton);

        // input박스 전환여부 확인
        const nicknameInput = component.getByLabelText('nickname') as HTMLInputElement;
        const introduceInput = component.getByLabelText('introduce') as HTMLInputElement;
        expect(nicknameInput.value).toBe(profileMock.nickname);
        expect(introduceInput.value).toBe(profileMock.introduce);
      });
    });

    it('수정 전환 후 저장 전환', async () => {
      updateProfileIntroduceMockAPI.mockReturnValue(new Promise((res) => res(true)));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modifyButton = component.getByText('수정');
        fireEvent.click(modifyButton);
        const nicknameInput = component.getByLabelText('nickname') as HTMLInputElement;
        const introduceInput = component.getByLabelText('introduce') as HTMLInputElement;
        fireEvent.change(nicknameInput, { target: { value: `${profileMock.nickname}!` } });
        fireEvent.change(introduceInput, { target: { value: `${profileMock.introduce}!` } });

        const saveButton = component.getByText('저장');
        fireEvent.click(saveButton);
        component.getByText(`${profileMock.nickname}!`);
        component.getByText(`${profileMock.introduce}!`);
      });
    });
  });

  describe('github url기능', () => {
    it('렌더링', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        component.getByText(profileMock.githubUrl);
      });
    });

    it('수정 아이콘 클릭 시 전환', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modifyButton = component.getByLabelText('logo-pencil');
        fireEvent.click(modifyButton);

        const githubInput = component.getByLabelText('github-input') as HTMLInputElement;
        expect(githubInput.value).toBe(profileMock.githubUrl);
      });
    });

    it('수정 전환 후 저장 전환', async () => {
      updateGithubIntroduceMock.mockReturnValue(new Promise((res) => res(true)));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modifyButton = component.getByLabelText('logo-pencil');
        fireEvent.click(modifyButton);
        const githubInput = component.getByLabelText('github-input') as HTMLInputElement;
        fireEvent.change(githubInput, { target: { value: `${profileMock.githubUrl}!` } });

        const saveButton = component.getByLabelText('logo-disk');
        fireEvent.click(saveButton);
        component.getByText(`${profileMock.githubUrl}!`);
      });
    });
  });

  describe('blog url기능', () => {
    it('렌더링', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        component.getByText(profileMock.blogUrl);
      });
    });

    it('수정 아이콘 클릭 시 전환', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modifyButton = component.getByLabelText('home-pencil');
        fireEvent.click(modifyButton);

        const blogInput = component.getByLabelText('blog-input') as HTMLInputElement;
        expect(blogInput.value).toBe(profileMock.blogUrl);
      });
    });

    it('수정 전환 후 저장 전환', async () => {
      updateBlogIntroduceMock.mockReturnValue(new Promise((res) => res(true)));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modifyButton = component.getByLabelText('home-pencil');
        fireEvent.click(modifyButton);
        const blogInput = component.getByLabelText('blog-input') as HTMLInputElement;
        fireEvent.change(blogInput, { target: { value: `${profileMock.blogUrl}!` } });

        const saveButton = component.getByLabelText('home-disk');
        fireEvent.click(saveButton);
        component.getByText(`${profileMock.blogUrl}!`);
      });
    });
  });

  describe('기술스택 기능', () => {
    it('렌더링', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        component.getAllByText(profileMock.userSkills[0].skillName);
        component.getAllByText(profileMock.userSkills[1].skillName);
      });
    });
  });

  describe('프로젝트 기능', () => {
    it('렌더링', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        component.getAllByText(profileMock.projects[0].title);
        component.getAllByText(profileMock.projects[0].deployUrl);
        component.getAllByText(profileMock.projects[0].githubUrl);
        component.getAllByText(profileMock.projects[0].introduce);
        component.getAllByText(
          `${dateToString(profileMock.projects[0].startDate)} ~ ${dateToString(profileMock.projects[0].endDate)}`,
        );
        component.getAllByText(profileMock.projects[0].content);
        component.getAllByText(profileMock.projects[0].projectSklls[0].skillName);
      });
    });
  });
});
