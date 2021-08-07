import React from 'react';
import SigninTemplate from './template';

export default {
  title: 'Template/Signin',
  component: SigninTemplate,
};

export const signin = (): React.ReactElement => {
  return <SigninTemplate />;
};
