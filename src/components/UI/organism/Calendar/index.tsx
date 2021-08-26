import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import * as Style from './styled';
import 'react-datepicker/dist/react-datepicker.css';
import Overlay from '../../../Layout/Overlay';

interface CalendarProps {
  isRange?: boolean;
  startPlaceholder: string;
  endPlaceholder?: string;
}

function Calendar({ isRange = false, startPlaceholder, endPlaceholder }: CalendarProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const onChangeIfRangeTrue = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const onChangeIfRangeFalse = (date: Date) => {
    setStartDate(date);
  };

  const dateToString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      {isCalendarOpen && <Overlay clickModalOutside={() => setIsCalendarOpen(false)} />}
      <Style.Container>
        <Style.DateWrapper isDateSelected={!!startDate} onClick={() => setIsCalendarOpen(true)}>
          {startDate ? dateToString(startDate) : startPlaceholder}
        </Style.DateWrapper>

        {isRange && (
          <>
            ~
            <Style.DateWrapper isDateSelected={!!endDate} onClick={() => setIsCalendarOpen(true)}>
              {endDate ? dateToString(endDate) : endPlaceholder}
            </Style.DateWrapper>
          </>
        )}
        {isCalendarOpen && (
          <Style.CalendarWrapper>
            <DatePicker
              selected={startDate}
              onChange={isRange ? onChangeIfRangeTrue : onChangeIfRangeFalse}
              startDate={startDate}
              endDate={endDate}
              selectsRange={isRange}
              inline
            />
          </Style.CalendarWrapper>
        )}
      </Style.Container>
    </>
  );
}

export default Calendar;
