import React from 'react';
import { action } from '@storybook/addon-actions';
import LoginForm from '.';
import { LoginInfoType } from '../../../../validator/loginValidator';

export default {
  title: 'Organism/LoginForm',
  component: LoginForm,
};

const onSubmitAction = action('form submitted');
const handleSubmit = (_: LoginInfoType) => {
  onSubmitAction(_);
  return '';
};

export const loginForm = (): React.ReactElement => {
  return <LoginForm handleSubmit={handleSubmit} />;
};
