import React from 'react';
import ProfileTemplate from './template';

export default {
  title: 'Template/Profile',
  component: ProfileTemplate,
};

export const profile = (): React.ReactElement => {
  return <ProfileTemplate />;
};
