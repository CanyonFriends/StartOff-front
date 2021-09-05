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
  const deleteItem = () => {};
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

    component.getByLabelText('pencil-icon');
    component.getByLabelText('trashcan-icon');
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
    const deleteItem = () => {
      text = 'shellboy';
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

    const deleteIcon = component.getByLabelText('trashcan-icon');
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

    const modifyIcon = component.getByLabelText('pencil-icon');
    fireEvent.click(modifyIcon);
    await component.findByText('프로젝트 수정');
  });
});
