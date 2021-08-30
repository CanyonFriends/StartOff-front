import React from 'react';
import { action } from '@storybook/addon-actions';
import SearchBox from '.';

export default {
  title: 'Molecule/SearchBox',
  component: SearchBox,
};

const onSubmitAction = action('form submitted');
const handleSubmit = async () => {
  onSubmitAction();
  return '';
};

export const searchbox = (): React.ReactElement => {
  return <SearchBox searchSubmit={handleSubmit} />;
};
