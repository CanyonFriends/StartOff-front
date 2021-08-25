import React from 'react';
import { action } from '@storybook/addon-actions';
import AccountInfoModal from '.';

export default {
  title: 'Organism/AccountInfoModal',
  component: AccountInfoModal,
};

const onClickAction = action('click');
const onSubmitAction = action('form submitted');
const handleSubmit = async () => {
  onSubmitAction();
  return '';
};

export const accountInfoModal = (): React.ReactElement => {
  return <AccountInfoModal handleCloseModal={onClickAction} changePassword={handleSubmit} deleteUser={onClickAction} />;
};
