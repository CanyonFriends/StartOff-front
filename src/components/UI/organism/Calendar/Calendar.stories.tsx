import React from 'react';
import { action } from '@storybook/addon-actions';
import Calendar from '.';

export default {
  title: 'Organism/Calendar',
  component: Calendar,
};

const onChangeAction = action('onChange');
export const isRangeTrue = (): React.ReactElement => {
  return (
    <Calendar
      isRange
      startPlaceholder="시작 날짜 선택"
      endPlaceholder="종료 날짜 선택"
      handleChangeDate={onChangeAction}
    />
  );
};

export const isRangeFalse = (): React.ReactElement => {
  return <Calendar isRange={false} startPlaceholder="날짜 선택" handleChangeDate={onChangeAction} />;
};
