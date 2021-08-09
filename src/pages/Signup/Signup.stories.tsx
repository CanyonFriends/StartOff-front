import React from 'react';
import SignupTemplate from './template';

export default {
  title: 'Template/Signup',
  component: SignupTemplate,
};

export const signup = (): React.ReactElement => {
  return <SignupTemplate />;
};
