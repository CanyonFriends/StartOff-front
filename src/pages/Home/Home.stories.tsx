import React from 'react';
import HomeTemplate from './template';

export default {
  title: 'Template/Home',
  component: HomeTemplate,
};

export const home = (): React.ReactElement => {
  return <HomeTemplate />;
};
