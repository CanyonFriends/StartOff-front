import { action } from '@storybook/addon-actions';
import React from 'react';
import ProjectModal from '.';
import { makeProjectMock, makeSkillMock } from '../../../../__mocks__/client-mock-data';

export default {
  title: 'Organism/CreateProjectModal',
  component: ProjectModal,
};

const onClickAction = action('onClick');
const onSubmitAction = action('form submitted');
const handleSubmit = async () => {
  onSubmitAction();
  return '';
};

const skills = [
  makeSkillMock({ skillName: 'typescript' }),
  makeSkillMock({ skillName: 'javascript' }),
  makeSkillMock({ skillName: 'c#' }),
  makeSkillMock({ skillName: 'python' }),
];

export const modifyProjectModal = (): React.ReactElement => {
  return (
    <ProjectModal
      isModify
      project={makeProjectMock({})}
      onSubmit={handleSubmit}
      handleModalClose={onClickAction}
      totalSkillList={skills}
    />
  );
};

export const createProjectModal = (): React.ReactElement => {
  return (
    <ProjectModal isModify={false} onSubmit={handleSubmit} handleModalClose={onClickAction} totalSkillList={skills} />
  );
};
