/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { render } from '../../../../test-utils';
import Calendar from '../Calendar';
import { dateToString } from '../../../../utils/date';

describe('Component/Organism/Calendar', () => {
  const handleChangeDate = () => {};
  const startDate = new Date('1998-01-22');
  const endDate = new Date('2021-01-22');

  it('범위가 있는 경우 렌더링 테스트(날짜 선택되지 않음)', () => {
    const component = render(
      <Calendar isRange startPlaceholder="start date" endPlaceholder="end date" handleChangeDate={handleChangeDate} />,
    );

    component.getByText('start date');
    component.getByText('end date');
  });

  it('범위가 있는 경우 렌더링 테스트(날짜 선택됨)', () => {
    const component = render(
      <Calendar
        isRange
        start={startDate}
        end={endDate}
        startPlaceholder="start date"
        endPlaceholder="end date"
        handleChangeDate={handleChangeDate}
      />,
    );

    component.getByText(dateToString(startDate));
    component.getByText(dateToString(endDate));
  });

  it('범위가 없는 경우 테스트(날짜 선택되지 않음)', () => {
    const component = render(<Calendar startPlaceholder="start date" handleChangeDate={handleChangeDate} />);

    component.getByText('start date');
  });

  it('범위가 없는 경우 테스트(날짜 선택됨)', () => {
    const component = render(
      <Calendar start={startDate} startPlaceholder="start date" handleChangeDate={handleChangeDate} />,
    );

    component.getByText(dateToString(startDate));
  });

  it('start date클릭으로 calendar창 열고 닫기', async () => {
    const component = render(
      <Calendar
        isRange
        start={startDate}
        end={endDate}
        startPlaceholder="start date"
        endPlaceholder="end date"
        handleChangeDate={handleChangeDate}
      />,
    );

    const startDateButton = component.getByLabelText('calendar-start-date');
    fireEvent.click(startDateButton);
    await component.findByLabelText('calendar-calendar');

    const overlay = await component.findByLabelText('overlay');
    fireEvent.click(overlay);
  });

  it('end date클릭으로 calendar창 열고 닫기', async () => {
    const component = render(
      <Calendar
        isRange
        start={startDate}
        end={endDate}
        startPlaceholder="start date"
        endPlaceholder="end date"
        handleChangeDate={handleChangeDate}
      />,
    );

    const endDateButton = component.getByLabelText('calendar-end-date');
    fireEvent.click(endDateButton);
    await component.findByLabelText('calendar-calendar');

    const overlay = await component.findByLabelText('overlay');
    fireEvent.click(overlay);
  });
});
