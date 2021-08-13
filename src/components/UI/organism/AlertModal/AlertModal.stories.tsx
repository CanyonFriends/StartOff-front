import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import AlertModal from '.';

export default {
  title: 'Organism/AlertModal',
  component: AlertModal,
  decorators: [withKnobs],
};

export const warningAlertModal = (): React.ReactElement => {
  const content = text('CONTENT', '로그인에 실패하였습니다');
  return <AlertModal content={content} isSuccess={false} />;
};

export const successAlertModal = (): React.ReactElement => {
  const content = text('CONTENT', '로그인에 성공하였습니다');
  return <AlertModal content={content} isSuccess />;
};
