/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../test-utils';
import ProfilePage from '../Profile';
import {
  getProfileAPI,
  updateProfileIntroduceAPI,
  updateGithubIntroduceAPI,
  updateBlogIntroduceAPI,
  updateUserSkillAPI,
  deleteUserSkillAPI,
} from '../../api/profile';
import { getSkillsAPI } from '../../api/skill';
import { makeProfileMock, makeProjectMock, makeSkillMock } from '../../__mocks__/client-mock-data';
import { dateToString } from '../../utils/date';
import { updatePasswordAPI } from '../../api/user';
import { createProjectAPI, updateProjectAPI, deleteProjectAPI } from '../../api/project';
import { getCategoriesAPI } from '../../api/post';

jest.mock('../../api/user');
jest.mock('../../api/profile');
jest.mock('../../api/skill');
jest.mock('../../api/project');
jest.mock('../../api/post');

const updatePassworMockAPI = updatePasswordAPI as jest.MockedFunction<typeof updatePasswordAPI>;
const getProfileMockAPI = getProfileAPI as jest.MockedFunction<typeof getProfileAPI>;
const getSkillsMockAPI = getSkillsAPI as jest.MockedFunction<typeof getSkillsAPI>;
const updateSkillMockAPI = updateUserSkillAPI as jest.MockedFunction<typeof updateUserSkillAPI>;
const deleteSkillMockAPI = deleteUserSkillAPI as jest.MockedFunction<typeof deleteUserSkillAPI>;
const updateProfileIntroduceMockAPI = updateProfileIntroduceAPI as jest.MockedFunction<
  typeof updateProfileIntroduceAPI
>;
const updateGithubIntroduceMock = updateGithubIntroduceAPI as jest.MockedFunction<typeof updateGithubIntroduceAPI>;
const updateBlogIntroduceMock = updateBlogIntroduceAPI as jest.MockedFunction<typeof updateBlogIntroduceAPI>;
const updateProjectMockAPI = updateProjectAPI as jest.MockedFunction<typeof updateProjectAPI>;
const createProjectMockAPI = createProjectAPI as jest.MockedFunction<typeof createProjectAPI>;
const deleteProjectMockAPI = deleteProjectAPI as jest.MockedFunction<typeof deleteProjectAPI>;
const getCategoriesMockAPI = getCategoriesAPI as jest.MockedFunction<typeof getCategoriesAPI>;

const skillMockList = [
  makeSkillMock({ skillName: 'typescript' }),
  makeSkillMock({ skillName: 'javascript' }),
  makeSkillMock({ skillName: 'c#' }),
  makeSkillMock({ skillName: 'python' }),
];
const profileMock = makeProfileMock({
  projects: [makeProjectMock({ projectSklls: [makeSkillMock({ skillName: 'c#' })] })],
  userSkills: [makeSkillMock({ skillName: 'typescript' }), makeSkillMock({ skillName: 'javascript' })],
});

beforeEach(() => {
  jest.resetAllMocks();
  getProfileMockAPI.mockReturnValue(new Promise((res) => res(profileMock)));
  getSkillsMockAPI.mockReturnValue(new Promise((res) => res(skillMockList)));
  getCategoriesMockAPI.mockReturnValue(new Promise((res) => res([])));
});

describe('<Profile> 페이지', () => {
  it('snapshot 체크', async () => {
    const component = render(<ProfilePage />);
    await waitFor(() => expect(component.container).toMatchSnapshot());
  });

  it('getProfile api에러', async () => {
    getProfileMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
    const component = render(<ProfilePage />);

    await waitFor(() => {
      component.getByText('error');
      const closeButton = component.getByText('닫기');
      fireEvent.click(closeButton);
    });
  });

  it('getTodalSkills api에러', async () => {
    getSkillsMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
    const component = render(<ProfilePage />);

    await waitFor(() => {
      component.getByText('error');
      const closeButton = component.getByText('닫기');
      fireEvent.click(closeButton);
    });
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
      updatePassworMockAPI.mockReturnValue(new Promise((res) => res(true)));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modalButton = component.getByText('계정 정보 변경');
        fireEvent.click(modalButton);

        const currentPasswordInput = component.getByLabelText('currentpw');
        const afterPasswirdInput = component.getByLabelText('afterpw');
        const confirmPasswordinput = component.getByLabelText('confirmpw');

        fireEvent.change(currentPasswordInput, { target: { value: `currentpassword` } });
        fireEvent.change(afterPasswirdInput, { target: { value: `afterpassword` } });
        fireEvent.change(confirmPasswordinput, { target: { value: `afterpassword` } });

        const submitButton = component.getByText('변경하기');
        fireEvent.click(submitButton);
        component.getByText('비밀번호를 변경하였습니다');
        const closeModalButton = component.getByText('닫기');
        fireEvent.click(closeModalButton);
      });
    });

    it('비밀번호 변경 에러', async () => {
      updatePassworMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modalButton = component.getByText('계정 정보 변경');
        fireEvent.click(modalButton);

        const currentPasswordInput = component.getByLabelText('currentpw');
        const afterPasswirdInput = component.getByLabelText('afterpw');
        const confirmPasswordinput = component.getByLabelText('confirmpw');

        fireEvent.change(currentPasswordInput, { target: { value: `currentpassword` } });
        fireEvent.change(afterPasswirdInput, { target: { value: `afterpassword` } });
        fireEvent.change(confirmPasswordinput, { target: { value: `afterpassword` } });

        const submitButton = component.getByText('변경하기');
        fireEvent.click(submitButton);
      });
      component.getByText('error');
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

    it('수정 시 에러 발생할 경우', async () => {
      updateProfileIntroduceMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
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
      });
      component.getByText('error');
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

    it('수정 시 에러 발생', async () => {
      updateGithubIntroduceMock.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modifyButton = component.getByLabelText('logo-pencil');
        fireEvent.click(modifyButton);
        const githubInput = component.getByLabelText('github-input') as HTMLInputElement;
        fireEvent.change(githubInput, { target: { value: `${profileMock.githubUrl}!` } });

        const saveButton = component.getByLabelText('logo-disk');
        fireEvent.click(saveButton);
      });
      component.getByText('error');
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
        const blogInput = component.getByLabelText('blog-input');
        fireEvent.change(blogInput, { target: { value: `${profileMock.blogUrl}!` } });

        const saveButton = component.getByLabelText('home-disk');
        fireEvent.click(saveButton);
        component.getByText(`${profileMock.blogUrl}!`);
      });
    });

    it('수정 시 에러 발생', async () => {
      updateBlogIntroduceMock.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modifyButton = component.getByLabelText('home-pencil');
        fireEvent.click(modifyButton);
        const blogInput = component.getByLabelText('blog-input');
        fireEvent.change(blogInput, { target: { value: `${profileMock.blogUrl}!` } });

        const saveButton = component.getByLabelText('home-disk');
        fireEvent.click(saveButton);
      });
      component.getByText('error');
    });
  });

  describe('기술스택 기능', () => {
    it('렌더링', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        component.getByText(profileMock.userSkills[0].skillName);
        component.getByText(profileMock.userSkills[1].skillName);
        component.getByText('스택 추가');
      });
    });

    it('기술스택 선택', async () => {
      updateSkillMockAPI.mockReturnValue(new Promise((res) => res(makeSkillMock({ skillName: 'python' }))));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const skillDropdown = component.getByText('스택 추가');
        fireEvent.click(skillDropdown);
        const pythonSkill = component.getByText('python');
        fireEvent.click(pythonSkill);
        component.getByText('python');
      });
    });

    it('기술스택 선택 에러', async () => {
      updateSkillMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const skillDropdown = component.getByText('스택 추가');
        fireEvent.click(skillDropdown);
        const pythonSkill = component.getByText('python');
        fireEvent.click(pythonSkill);
        component.getByText('error');
        const closeModalButton = component.getByText('닫기');
        fireEvent.click(closeModalButton);
      });
    });

    it('기술스택 삭제', async () => {
      deleteSkillMockAPI.mockReturnValue(new Promise((res) => res(true)));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const deleteSkillButtons = component.getAllByText('x');
        expect(deleteSkillButtons).toHaveLength(2);

        fireEvent.click(deleteSkillButtons[0]);
      });
    });

    it('기술스택 삭제 에러', async () => {
      deleteSkillMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const deleteSkillButtons = component.getAllByText('x');
        fireEvent.click(deleteSkillButtons[0]);

        component.getByText('error');
        const closeModalButton = component.getByText('닫기');
        fireEvent.click(closeModalButton);
      });
    });
  });

  describe('프로젝트 기능', () => {
    it('렌더링', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        component.getByText(profileMock.projects[0].title);
        component.getByText(profileMock.projects[0].deployUrl);
        component.getByText(profileMock.projects[0].githubUrl);
        component.getByText(profileMock.projects[0].introduce);
        component.getByText(
          `${dateToString(profileMock.projects[0].startDate)} ~ ${dateToString(profileMock.projects[0].endDate)}`,
        );
        component.getByText(profileMock.projects[0].content);
        component.getByText(profileMock.projects[0].projectSklls[0].skillName);
      });
    });

    it('프로젝트 생성하기', async () => {
      const newProject = makeProjectMock({
        title: 'title2',
        deployUrl: 'deployURL',
        githubUrl: 'githubURL',
        introduce: 'introduce',
        startDate: new Date('2000-03-16'),
        endDate: undefined,
        content: 'content',
        projectSklls: [makeSkillMock({ skillName: 'python' })],
      });
      createProjectMockAPI.mockReturnValueOnce(new Promise((res) => res(newProject)));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        // 생성
        const addIcon = component.getByLabelText('project-plus-icon');
        fireEvent.click(addIcon);

        component.getByText('프로젝트 생성');
        const startDateButton = component.getByLabelText('calendar-start-date');
        fireEvent.click(startDateButton);

        const titleInput = component.getByLabelText('title');
        const calendarDate = component.getByText(20);
        fireEvent.click(calendarDate);
        fireEvent.change(titleInput, { target: { value: 'title' } });

        const createButton = component.getByText('생성하기');
        fireEvent.click(createButton);
      });
      // 리스트 확인
      component.getByText(newProject.title);
      component.getByText(newProject.githubUrl);
      component.getByText(newProject.introduce);
      component.getByText(`${dateToString(newProject.startDate)} ~ ${dateToString(newProject.endDate)}`);
      component.getByText(newProject.content);
      component.getByText(newProject.projectSklls[0].skillName);
      component.getByText(newProject.deployUrl);
    });

    it('프로젝트 생성 시 api 오류 발생', async () => {
      createProjectMockAPI.mockReturnValueOnce(new Promise((res) => res({ error_msg: 'error' })));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        // 생성
        const addIcon = component.getByLabelText('project-plus-icon');
        fireEvent.click(addIcon);

        component.getByText('프로젝트 생성');
        const startDateButton = component.getByLabelText('calendar-start-date');
        fireEvent.click(startDateButton);

        const titleInput = component.getByLabelText('title');
        const calendarDate = component.getByText(20);
        fireEvent.click(calendarDate);
        fireEvent.change(titleInput, { target: { value: 'title' } });

        const createButton = component.getByText('생성하기');
        fireEvent.click(createButton);
      });
      // 리스트 확인
      component.getByText('error');
    });

    it('프로젝트 수정하기', async () => {
      const modifiedProject = makeProjectMock({
        title: 'title2',
        deployUrl: 'deployURL',
        githubUrl: 'githubURL',
        introduce: 'introduce',
        startDate: new Date('2000-03-16'),
        endDate: undefined,
        content: 'content',
        projectSklls: [makeSkillMock({ skillName: 'python' })],
      });
      updateProjectMockAPI.mockReturnValueOnce(new Promise((res) => res(modifiedProject)));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modifyIcon = component.getByLabelText('project-pencil-icon');
        fireEvent.click(modifyIcon);
        component.getByText('프로젝트 수정');

        const modifyButton = component.getByText('수정하기');
        fireEvent.click(modifyButton);
      });
      // 리스트 확인
      component.getByText(modifiedProject.title);
      component.getByText(modifiedProject.githubUrl);
      component.getByText(modifiedProject.introduce);
      component.getByText(`${dateToString(modifiedProject.startDate)} ~ ${dateToString(modifiedProject.endDate)}`);
      component.getByText(modifiedProject.content);
      component.getByText(modifiedProject.projectSklls[0].skillName);
      component.getByText(modifiedProject.deployUrl);
    });

    it('프로젝트 수정 시 api 오류 발생', async () => {
      updateProjectMockAPI.mockReturnValueOnce(new Promise((res) => res({ error_msg: 'error' })));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modifyIcon = component.getByLabelText('project-pencil-icon');
        fireEvent.click(modifyIcon);
        component.getByText('프로젝트 수정');

        const modifyButton = component.getByText('수정하기');
        fireEvent.click(modifyButton);
      });
      component.getByText('error');
    });
  });

  it('프로젝트 삭제하기', async () => {
    deleteProjectMockAPI.mockReturnValue(new Promise((res) => res(true)));
    const component = render(<ProfilePage />);

    await waitFor(() => {
      const deleteButton = component.getByLabelText('project-trashcan-icon');
      fireEvent.click(deleteButton);
    });
  });

  it('프로젝트 삭제 시 api 오류 발생', async () => {
    deleteProjectMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
    const component = render(<ProfilePage />);

    await waitFor(() => {
      const deleteButton = component.getByLabelText('project-trashcan-icon');
      fireEvent.click(deleteButton);
    });
    component.getByText('error');
  });
});
