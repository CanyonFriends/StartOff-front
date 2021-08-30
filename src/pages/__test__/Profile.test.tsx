/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../test-utils';
import ProfilePage from '../Profile';
import { getProfileAPI, updateProfileIntroduce, updateGithubIntroduce, updateBlogIntroduce } from '../../api/profile';
import { getSkillsAPI } from '../../api/skill';
import { profile, skills, project } from '../../__test__/mock-dats';
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

beforeEach(() => {
  jest.resetAllMocks();
  getProfileMockAPI.mockReturnValue(new Promise((res) => res(profile)));
  getSkillsMockAPI.mockReturnValue(new Promise((res) => res(skills)));
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
        component.getByText(profile.nickname);
        component.getByText(profile.introduce);
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
        expect(nicknameInput.value).toBe(profile.nickname);
        expect(introduceInput.value).toBe(profile.introduce);
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
        fireEvent.change(nicknameInput, { target: { value: `${profile.nickname}!` } });
        fireEvent.change(introduceInput, { target: { value: `${profile.introduce}!` } });

        const saveButton = component.getByText('저장');
        fireEvent.click(saveButton);
        component.getByText(`${profile.nickname}!`);
        component.getByText(`${profile.introduce}!`);
      });
    });
  });

  describe('github url기능', () => {
    it('렌더링', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        component.getByText(profile.githubUrl);
      });
    });

    it('수정 아이콘 클릭 시 전환', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modifyButton = component.getByLabelText('logo-pencil');
        fireEvent.click(modifyButton);

        const githubInput = component.getByLabelText('github') as HTMLInputElement;
        expect(githubInput.value).toBe(profile.githubUrl);
      });
    });

    it('수정 전환 후 저장 전환', async () => {
      updateGithubIntroduceMock.mockReturnValue(new Promise((res) => res(true)));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modifyButton = component.getByLabelText('logo-pencil');
        fireEvent.click(modifyButton);
        const githubInput = component.getByLabelText('github') as HTMLInputElement;
        fireEvent.change(githubInput, { target: { value: `${profile.githubUrl}!` } });

        const saveButton = component.getByLabelText('logo-disk');
        fireEvent.click(saveButton);
        component.getByText(`${profile.githubUrl}!`);
      });
    });
  });

  describe('blog url기능', () => {
    it('렌더링', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        component.getByText(profile.blogUrl);
      });
    });

    it('수정 아이콘 클릭 시 전환', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modifyButton = component.getByLabelText('home-pencil');
        fireEvent.click(modifyButton);

        const blogInput = component.getByLabelText('blog') as HTMLInputElement;
        expect(blogInput.value).toBe(profile.blogUrl);
      });
    });

    it('수정 전환 후 저장 전환', async () => {
      updateBlogIntroduceMock.mockReturnValue(new Promise((res) => res(true)));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modifyButton = component.getByLabelText('home-pencil');
        fireEvent.click(modifyButton);
        const blogInput = component.getByLabelText('blog') as HTMLInputElement;
        fireEvent.change(blogInput, { target: { value: `${profile.blogUrl}!` } });

        const saveButton = component.getByLabelText('home-disk');
        fireEvent.click(saveButton);
        component.getByText(`${profile.blogUrl}!`);
      });
    });
  });

  describe('기술스택 기능', () => {
    it('렌더링', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        component.getByText(profile.userSkills[0].skillName);
        component.getByText(profile.userSkills[1].skillName);
      });
    });
  });

  describe('프로젝트 기능', () => {
    it('렌더링', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        component.getByText(project.title);
        component.getByText(project.deployUrl);
        component.getByText(project.githubUrl);
        component.getByText(project.introduce);
        component.getByText(`${dateToString(project.startDate)} ~ ${dateToString(project.endDate)}`);
        component.getByText(project.content);
        component.getByText(skills[0].skillName);
      });
    });
  });
});
