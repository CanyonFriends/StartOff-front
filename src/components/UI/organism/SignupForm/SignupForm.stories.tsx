import React from 'react';
import { action } from '@storybook/addon-actions';
import SignupForm from '.';
import { SignupInfoType } from '../../../../validator/signupValidator';

export default {
  title: 'Organism/SignupForm',
  component: SignupForm,
};

const onSubmitAction = action('form submitted');
const handleSubmit = (_: SignupInfoType) => {
  onSubmitAction(_);
  return '';
};

export const signupForm = (): React.ReactElement => {
  return <SignupForm handleSubmit={handleSubmit} />;
};
