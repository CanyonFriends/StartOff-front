import React from 'react';
import { action } from '@storybook/addon-actions';
import ProjectItem from '.';
import { project } from '../../../../__test__/mock-dats';

export default {
  title: 'Organism/ProjectItem',
  component: ProjectItem,
};

const onClickAction = action('onClick');
export const projectItemEditable = (): React.ReactElement => {
  return (
    <ProjectItem
      editableAuthority
      project={project}
      handleDeleteItem={onClickAction}
      handleModifyItem={onClickAction}
    />
  );
};

export const projectItemUnEditable = (): React.ReactElement => {
  return (
    <ProjectItem
      editableAuthority={false}
      project={project}
      handleDeleteItem={onClickAction}
      handleModifyItem={onClickAction}
    />
  );
};
