/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../../../test-utils';
import ProjectModal from '../ProjectModal';
import { makeProjectMock, makeSkillMock, mockString } from '../../../../__mocks__/client-mock-data';

beforeEach(() => {
  document.body.innerHTML = `<div id="modal"></div>`;
});

describe('Component/Organism/ProjectModal', () => {
  const onSubmit = async () => '';
  const handleModalClose = () => {};
  const project = makeProjectMock({});
  const totalSkill = [
    makeSkillMock({ skillName: 'javascript' }),
    makeSkillMock({ skillName: 'typescript' }),
    makeSkillMock({ skillName: 'python' }),
  ];

  it('생성 렌더링', () => {
    const component = render(
      <ProjectModal
        isModify={false}
        totalSkillList={totalSkill}
        onSubmit={onSubmit}
        handleModalClose={handleModalClose}
      />,
    );

    component.getByText('생성하기');
    component.getByText('기술 스택');
    const titleInput = component.getByLabelText('title');
    const introduceInput = component.getByLabelText('introduce');
    const githubInput = component.getByLabelText('github');
    const deployInput = component.getByLabelText('deploy');
    const calendarCheckbox = component.getByLabelText('calendar');
    const contentTextarea = component.getByLabelText('project-content');

    expect(titleInput).toHaveProperty('value', '');
    expect(introduceInput).toHaveProperty('value', '');
    expect(githubInput).toHaveProperty('value', '');
    expect(deployInput).toHaveProperty('value', '');
    expect(contentTextarea).toHaveProperty('value', '');
    expect(calendarCheckbox).toHaveAttribute('checked', '');
  });

  it('수정 렌더링', () => {
    const component = render(
      <ProjectModal
        isModify
        project={project}
        totalSkillList={totalSkill}
        onSubmit={onSubmit}
        handleModalClose={handleModalClose}
      />,
    );

    component.getByText('수정하기');
    component.getByText('기술 스택');
    const titleInput = component.getByLabelText('title');
    const introduceInput = component.getByLabelText('introduce');
    const githubInput = component.getByLabelText('github');
    const deployInput = component.getByLabelText('deploy');
    const contentTextarea = component.getByLabelText('project-content');

    expect(titleInput).toHaveProperty('value', project.title);
    expect(introduceInput).toHaveProperty('value', project.introduce);
    expect(githubInput).toHaveProperty('value', project.githubUrl);
    expect(deployInput).toHaveProperty('value', project.deployUrl);
    expect(contentTextarea).toHaveProperty('value', project.content);
  });

  it('input 변경', async () => {
    const component = render(
      <ProjectModal
        isModify={false}
        totalSkillList={totalSkill}
        onSubmit={onSubmit}
        handleModalClose={handleModalClose}
      />,
    );

    component.getByText('생성하기');
    component.getByText('기술 스택');
    const titleInput = component.getByLabelText('title');
    const introduceInput = component.getByLabelText('introduce');
    const githubInput = component.getByLabelText('github');
    const deployInput = component.getByLabelText('deploy');
    const calendarCheckbox = component.getByLabelText('calendar');
    const contentTextarea = component.getByLabelText('project-content');

    fireEvent.change(titleInput, { target: { value: 'title' } });
    fireEvent.change(introduceInput, { target: { value: 'introduce' } });
    fireEvent.change(githubInput, { target: { value: 'github' } });
    fireEvent.change(deployInput, { target: { value: 'deploy' } });
    fireEvent.change(contentTextarea, { target: { value: 'content' } });
    fireEvent.click(calendarCheckbox);
    await waitFor(() => {
      expect(titleInput).toHaveProperty('value', 'title');
      expect(introduceInput).toHaveProperty('value', 'introduce');
      expect(githubInput).toHaveProperty('value', 'github');
      expect(deployInput).toHaveProperty('value', 'deploy');
      expect(contentTextarea).toHaveProperty('value', 'content');
      expect(calendarCheckbox).toHaveProperty('checked', false);
    });
  });

  it('input별 글자 수 제한', async () => {
    const component = render(
      <ProjectModal
        isModify={false}
        totalSkillList={totalSkill}
        onSubmit={onSubmit}
        handleModalClose={handleModalClose}
      />,
    );

    component.getByText('생성하기');
    component.getByText('기술 스택');
    const titleInput = component.getByLabelText('title');
    const introduceInput = component.getByLabelText('introduce');
    const githubInput = component.getByLabelText('github');
    const deployInput = component.getByLabelText('deploy');
    const contentTextarea = component.getByLabelText('project-content');

    fireEvent.change(titleInput, { target: { value: mockString } });
    fireEvent.change(introduceInput, { target: { value: mockString } });
    fireEvent.change(githubInput, { target: { value: mockString } });
    fireEvent.change(deployInput, { target: { value: mockString } });
    fireEvent.change(contentTextarea, { target: { value: mockString } });
    await waitFor(() => {
      expect(titleInput).toHaveProperty('value', '');
      expect(introduceInput).toHaveProperty('value', '');
      expect(githubInput).toHaveProperty('value', '');
      expect(deployInput).toHaveProperty('value', '');
      expect(contentTextarea).toHaveProperty('value', '');
    });
  });

  it('제출 후 에러 발생', async () => {
    const onSubmit = async () => 'error';
    const component = render(
      <ProjectModal
        isModify
        project={project}
        totalSkillList={totalSkill}
        onSubmit={onSubmit}
        handleModalClose={handleModalClose}
      />,
    );

    const modifyButton = component.getByText('수정하기');
    fireEvent.click(modifyButton);
    await component.findByText('error');
  });
});
