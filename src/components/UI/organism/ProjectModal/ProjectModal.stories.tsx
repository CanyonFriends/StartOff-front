import { action } from '@storybook/addon-actions';
import React from 'react';
import ProjectModal from '.';
import { project, skills } from '../../../../__test__/mock-dats';

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

export const modifyProjectModal = (): React.ReactElement => {
  return (
    <ProjectModal
      isModify
      project={project}
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
