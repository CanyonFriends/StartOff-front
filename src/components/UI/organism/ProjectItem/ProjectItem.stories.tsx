import React from 'react';
import { action } from '@storybook/addon-actions';
import ProjectItem from '.';
import { makeProjectMock, makeSkillMock } from '../../../../__mocks__/mock-dats';

export default {
  title: 'Organism/ProjectItem',
  component: ProjectItem,
};

const onClickAction = action('onClick');
const onClickAsyncAction = async () => {
  onClickAction();
  return '';
};
const skills = [
  makeSkillMock({ skillName: 'typescript' }),
  makeSkillMock({ skillName: 'javascript' }),
  makeSkillMock({ skillName: 'c#' }),
  makeSkillMock({ skillName: 'python' }),
];

export const projectItemEditable = (): React.ReactElement => {
  return (
    <ProjectItem
      editableAuthority
      project={makeProjectMock({})}
      handleDeleteItem={onClickAction}
      handleModifyItem={onClickAsyncAction}
      totalSkillList={skills}
    />
  );
};

export const projectItemUnEditable = (): React.ReactElement => {
  return (
    <ProjectItem
      editableAuthority={false}
      project={makeProjectMock({})}
      handleDeleteItem={onClickAction}
      handleModifyItem={onClickAsyncAction}
      totalSkillList={skills}
    />
  );
};
