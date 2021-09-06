/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../../../test-utils';
import ProjectItem from '../ProjectItem';
import { makeProjectMock, makeSkillMock } from '../../../../__mocks__/client-mock-data';
import { dateToString } from '../../../../utils/date';

describe('Component/Organism/ProjectItem', () => {
  const project = makeProjectMock({});
  const skills = [makeSkillMock({}), makeSkillMock({}), makeSkillMock({})];
  const deleteItem = async () => '';
  const modifyItem = async () => '';

  it('렌더링 테스트(수정권한 없음)', () => {
    const component = render(
      <ProjectItem
        project={project}
        editableAuthority={false}
        totalSkillList={skills}
        handleDeleteItem={deleteItem}
        handleModifyItem={modifyItem}
      />,
    );

    component.getByText(`${dateToString(project.startDate)} ~ ${dateToString(project.endDate)}`);
    component.getByText(project.title);
    component.getByText(project.introduce);
    component.getByText(project.githubUrl);
    component.getByText(project.deployUrl);
    component.getByText(project.content);
    component.getByText(project.projectSklls[0].skillName);
    component.getByText(project.projectSklls[1].skillName);
  });

  it('렌더링 테스트(수정권한 있음)', () => {
    const component = render(
      <ProjectItem
        editableAuthority
        project={project}
        totalSkillList={skills}
        handleDeleteItem={deleteItem}
        handleModifyItem={modifyItem}
      />,
    );

    component.getByLabelText('project-pencil-icon');
    component.getByLabelText('project-trashcan-icon');
    component.getByText(`${dateToString(project.startDate)} ~ ${dateToString(project.endDate)}`);
    component.getByText(project.title);
    component.getByText(project.introduce);
    component.getByText(project.githubUrl);
    component.getByText(project.deployUrl);
    component.getByText(project.content);
    component.getByText(project.projectSklls[0].skillName);
    component.getByText(project.projectSklls[1].skillName);
  });

  it('삭제 아이콘 클릭', () => {
    let text = '';
    const deleteItem = async () => {
      text = 'shellboy';
      return '';
    };
    const component = render(
      <ProjectItem
        editableAuthority
        project={project}
        totalSkillList={skills}
        handleDeleteItem={deleteItem}
        handleModifyItem={modifyItem}
      />,
    );

    const deleteIcon = component.getByLabelText('project-trashcan-icon');
    fireEvent.click(deleteIcon);
    waitFor(() => {
      expect(text).toBe('shellboy');
    });
  });

  it('수정 아이콘 클릭 시 모달 오픈', async () => {
    const component = render(
      <ProjectItem
        editableAuthority
        project={project}
        totalSkillList={skills}
        handleDeleteItem={deleteItem}
        handleModifyItem={modifyItem}
      />,
    );

    const modifyIcon = component.getByLabelText('project-pencil-icon');
    fireEvent.click(modifyIcon);
    await component.findByText('프로젝트 수정');
  });

  it('delete시 에러 발생', async () => {
    const deleteItem = async () => 'error';
    const component = render(
      <ProjectItem
        editableAuthority
        project={project}
        totalSkillList={skills}
        handleDeleteItem={deleteItem}
        handleModifyItem={modifyItem}
      />,
    );
    const deleteIcon = component.getByLabelText('project-trashcan-icon');
    fireEvent.click(deleteIcon);
    await component.findByText('error');
    const closeButton = await component.findByText('닫기');
    fireEvent.click(closeButton);
  });
});
