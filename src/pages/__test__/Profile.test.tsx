/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../test-utils';
import ProfilePage from '../Profile';
import {
  getProfileAPI,
  updateProfileIntroduce,
  updateGithubIntroduce,
  updateBlogIntroduce,
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
const updateProfileIntroduceMockAPI = updateProfileIntroduce as jest.MockedFunction<typeof updateProfileIntroduce>;
const updateGithubIntroduceMock = updateGithubIntroduce as jest.MockedFunction<typeof updateGithubIntroduce>;
const updateBlogIntroduceMock = updateBlogIntroduce as jest.MockedFunction<typeof updateBlogIntroduce>;
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

describe('<Profile> ?????????', () => {
  it('snapshot ??????', async () => {
    const component = render(<ProfilePage />);
    await waitFor(() => expect(component.container).toMatchSnapshot());
  });

  it('getProfile api??????', async () => {
    getProfileMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
    const component = render(<ProfilePage />);

    await waitFor(() => {
      component.getByText('error');
      const closeButton = component.getByText('??????');
      fireEvent.click(closeButton);
    });
  });

  it('getTodalSkills api??????', async () => {
    getSkillsMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
    const component = render(<ProfilePage />);

    await waitFor(() => {
      component.getByText('error');
      const closeButton = component.getByText('??????');
      fireEvent.click(closeButton);
    });
  });

  describe('???????????? ?????? ??????', () => {
    it('???????????? ?????? ?????? ?????????', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modalButton = component.getByText('?????? ?????? ??????');
        fireEvent.click(modalButton);

        const currentPasswordInput = component.getByLabelText('currentpw') as HTMLInputElement;
        const afterPasswirdInput = component.getByLabelText('afterpw') as HTMLInputElement;
        const confirmPasswordinput = component.getByLabelText('confirmpw') as HTMLInputElement;
        expect(currentPasswordInput.value).toBe('');
        expect(afterPasswirdInput.value).toBe('');
        expect(confirmPasswordinput.value).toBe('');
      });
    });

    it('???????????? ??????', async () => {
      updatePassworMockAPI.mockReturnValue(new Promise((res) => res(true)));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modalButton = component.getByText('?????? ?????? ??????');
        fireEvent.click(modalButton);

        const currentPasswordInput = component.getByLabelText('currentpw');
        const afterPasswirdInput = component.getByLabelText('afterpw');
        const confirmPasswordinput = component.getByLabelText('confirmpw');

        fireEvent.change(currentPasswordInput, { target: { value: `currentpassword` } });
        fireEvent.change(afterPasswirdInput, { target: { value: `afterpassword` } });
        fireEvent.change(confirmPasswordinput, { target: { value: `afterpassword` } });

        const submitButton = component.getByText('????????????');
        fireEvent.click(submitButton);
        component.getByText('??????????????? ?????????????????????');
        const closeModalButton = component.getByText('??????');
        fireEvent.click(closeModalButton);
      });
    });

    it('???????????? ?????? ??????', async () => {
      updatePassworMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modalButton = component.getByText('?????? ?????? ??????');
        fireEvent.click(modalButton);

        const currentPasswordInput = component.getByLabelText('currentpw');
        const afterPasswirdInput = component.getByLabelText('afterpw');
        const confirmPasswordinput = component.getByLabelText('confirmpw');

        fireEvent.change(currentPasswordInput, { target: { value: `currentpassword` } });
        fireEvent.change(afterPasswirdInput, { target: { value: `afterpassword` } });
        fireEvent.change(confirmPasswordinput, { target: { value: `afterpassword` } });

        const submitButton = component.getByText('????????????');
        fireEvent.click(submitButton);
      });
      component.getByText('error');
    });
  });

  describe('introduce??????', () => {
    it('?????????', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        component.getByText(profileMock.nickname);
        component.getByText(profileMock.introduce);
      });
    });

    it('???????????? ?????? ??? ??????', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modifyButton = component.getByText('??????');
        fireEvent.click(modifyButton);

        // input?????? ???????????? ??????
        const nicknameInput = component.getByLabelText('nickname') as HTMLInputElement;
        const introduceInput = component.getByLabelText('introduce') as HTMLInputElement;
        expect(nicknameInput.value).toBe(profileMock.nickname);
        expect(introduceInput.value).toBe(profileMock.introduce);
      });
    });

    it('?????? ?????? ??? ?????? ??????', async () => {
      updateProfileIntroduceMockAPI.mockReturnValue(new Promise((res) => res(true)));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modifyButton = component.getByText('??????');
        fireEvent.click(modifyButton);
        const nicknameInput = component.getByLabelText('nickname') as HTMLInputElement;
        const introduceInput = component.getByLabelText('introduce') as HTMLInputElement;
        fireEvent.change(nicknameInput, { target: { value: `${profileMock.nickname}!` } });
        fireEvent.change(introduceInput, { target: { value: `${profileMock.introduce}!` } });

        const saveButton = component.getByText('??????');
        fireEvent.click(saveButton);
        component.getByText(`${profileMock.nickname}!`);
        component.getByText(`${profileMock.introduce}!`);
      });
    });

    it('?????? ??? ?????? ????????? ??????', async () => {
      updateProfileIntroduceMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modifyButton = component.getByText('??????');
        fireEvent.click(modifyButton);

        const nicknameInput = component.getByLabelText('nickname') as HTMLInputElement;
        const introduceInput = component.getByLabelText('introduce') as HTMLInputElement;
        fireEvent.change(nicknameInput, { target: { value: `${profileMock.nickname}!` } });
        fireEvent.change(introduceInput, { target: { value: `${profileMock.introduce}!` } });

        const saveButton = component.getByText('??????');
        fireEvent.click(saveButton);
      });
      component.getByText('error');
    });
  });

  describe('github url??????', () => {
    it('?????????', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        component.getByText(profileMock.githubUrl);
      });
    });

    it('?????? ????????? ?????? ??? ??????', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modifyButton = component.getByLabelText('logo-pencil');
        fireEvent.click(modifyButton);

        const githubInput = component.getByLabelText('github-input') as HTMLInputElement;
        expect(githubInput.value).toBe(profileMock.githubUrl);
      });
    });

    it('?????? ?????? ??? ?????? ??????', async () => {
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

    it('?????? ??? ?????? ??????', async () => {
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

  describe('blog url??????', () => {
    it('?????????', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        component.getByText(profileMock.blogUrl);
      });
    });

    it('?????? ????????? ?????? ??? ??????', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modifyButton = component.getByLabelText('home-pencil');
        fireEvent.click(modifyButton);

        const blogInput = component.getByLabelText('blog-input') as HTMLInputElement;
        expect(blogInput.value).toBe(profileMock.blogUrl);
      });
    });

    it('?????? ?????? ??? ?????? ??????', async () => {
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

    it('?????? ??? ?????? ??????', async () => {
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

  describe('???????????? ??????', () => {
    it('?????????', async () => {
      const component = render(<ProfilePage />);

      await waitFor(() => {
        component.getByText(profileMock.userSkills[0].skillName);
        component.getByText(profileMock.userSkills[1].skillName);
        component.getByText('?????? ??????');
      });
    });

    it('???????????? ??????', async () => {
      updateSkillMockAPI.mockReturnValue(new Promise((res) => res(makeSkillMock({ skillName: 'python' }))));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const skillDropdown = component.getByText('?????? ??????');
        fireEvent.click(skillDropdown);
        const pythonSkill = component.getByText('python');
        fireEvent.click(pythonSkill);
        component.getByText('python');
      });
    });

    it('???????????? ?????? ??????', async () => {
      updateSkillMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const skillDropdown = component.getByText('?????? ??????');
        fireEvent.click(skillDropdown);
        const pythonSkill = component.getByText('python');
        fireEvent.click(pythonSkill);
        component.getByText('error');
        const closeModalButton = component.getByText('??????');
        fireEvent.click(closeModalButton);
      });
    });

    it('???????????? ??????', async () => {
      deleteSkillMockAPI.mockReturnValue(new Promise((res) => res(true)));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const deleteSkillButtons = component.getAllByText('x');
        expect(deleteSkillButtons).toHaveLength(2);

        fireEvent.click(deleteSkillButtons[0]);
      });
    });

    it('???????????? ?????? ??????', async () => {
      deleteSkillMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const deleteSkillButtons = component.getAllByText('x');
        fireEvent.click(deleteSkillButtons[0]);

        component.getByText('error');
        const closeModalButton = component.getByText('??????');
        fireEvent.click(closeModalButton);
      });
    });
  });

  describe('???????????? ??????', () => {
    it('?????????', async () => {
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

    it('???????????? ????????????', async () => {
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
        // ??????
        const addIcon = component.getByLabelText('project-plus-icon');
        fireEvent.click(addIcon);

        component.getByText('???????????? ??????');
        const startDateButton = component.getByLabelText('calendar-start-date');
        fireEvent.click(startDateButton);

        const titleInput = component.getByLabelText('title');
        const calendarDate = component.getByText(20);
        fireEvent.click(calendarDate);
        fireEvent.change(titleInput, { target: { value: 'title' } });

        const createButton = component.getByText('????????????');
        fireEvent.click(createButton);
      });
      // ????????? ??????
      component.getByText(newProject.title);
      component.getByText(newProject.githubUrl);
      component.getByText(newProject.introduce);
      component.getByText(`${dateToString(newProject.startDate)} ~ ${dateToString(newProject.endDate)}`);
      component.getByText(newProject.content);
      component.getByText(newProject.projectSklls[0].skillName);
      component.getByText(newProject.deployUrl);
    });

    it('???????????? ?????? ??? api ?????? ??????', async () => {
      createProjectMockAPI.mockReturnValueOnce(new Promise((res) => res({ error_msg: 'error' })));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        // ??????
        const addIcon = component.getByLabelText('project-plus-icon');
        fireEvent.click(addIcon);

        component.getByText('???????????? ??????');
        const startDateButton = component.getByLabelText('calendar-start-date');
        fireEvent.click(startDateButton);

        const titleInput = component.getByLabelText('title');
        const calendarDate = component.getByText(20);
        fireEvent.click(calendarDate);
        fireEvent.change(titleInput, { target: { value: 'title' } });

        const createButton = component.getByText('????????????');
        fireEvent.click(createButton);
      });
      // ????????? ??????
      component.getByText('error');
    });

    it('???????????? ????????????', async () => {
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
        component.getByText('???????????? ??????');

        const modifyButton = component.getByText('????????????');
        fireEvent.click(modifyButton);
      });
      // ????????? ??????
      component.getByText(modifiedProject.title);
      component.getByText(modifiedProject.githubUrl);
      component.getByText(modifiedProject.introduce);
      component.getByText(`${dateToString(modifiedProject.startDate)} ~ ${dateToString(modifiedProject.endDate)}`);
      component.getByText(modifiedProject.content);
      component.getByText(modifiedProject.projectSklls[0].skillName);
      component.getByText(modifiedProject.deployUrl);
    });

    it('???????????? ?????? ??? api ?????? ??????', async () => {
      updateProjectMockAPI.mockReturnValueOnce(new Promise((res) => res({ error_msg: 'error' })));
      const component = render(<ProfilePage />);

      await waitFor(() => {
        const modifyIcon = component.getByLabelText('project-pencil-icon');
        fireEvent.click(modifyIcon);
        component.getByText('???????????? ??????');

        const modifyButton = component.getByText('????????????');
        fireEvent.click(modifyButton);
      });
      component.getByText('error');
    });
  });

  it('???????????? ????????????', async () => {
    deleteProjectMockAPI.mockReturnValue(new Promise((res) => res(true)));
    const component = render(<ProfilePage />);

    await waitFor(() => {
      const deleteButton = component.getByLabelText('project-trashcan-icon');
      fireEvent.click(deleteButton);
    });
  });

  it('???????????? ?????? ??? api ?????? ??????', async () => {
    deleteProjectMockAPI.mockReturnValue(new Promise((res) => res({ error_msg: 'error' })));
    const component = render(<ProfilePage />);

    await waitFor(() => {
      const deleteButton = component.getByLabelText('project-trashcan-icon');
      fireEvent.click(deleteButton);
    });
    component.getByText('error');
  });
});
