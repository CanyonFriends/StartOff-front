import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import AlertModal from '.';

export default {
  title: 'Organism/AlertModal',
  component: AlertModal,
  decorators: [withKnobs],
};

const onClickAction = action('handle click');
export const warningAlertModal = (): React.ReactElement => {
  const content = text('CONTENT', '로그인에 실패하였습니다');
  return <AlertModal content={content} isSuccess={false} clickCloseButton={onClickAction} />;
};

export const successAlertModal = (): React.ReactElement => {
  const content = text('CONTENT', '로그인에 성공하였습니다');
  return <AlertModal content={content} isSuccess clickCloseButton={onClickAction} />;
};
