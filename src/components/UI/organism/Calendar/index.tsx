import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import * as Style from './styled';
import 'react-datepicker/dist/react-datepicker.css';
import Overlay from '../../../Layout/Overlay';

interface CalendarProps {
  isRange?: boolean;
  start?: Date;
  end?: Date;
  startPlaceholder: string;
  endPlaceholder?: string;
  handleChangeDate: (dates: Date[]) => void;
}

function Calendar({ isRange = false, start, end, startPlaceholder, endPlaceholder, handleChangeDate }: CalendarProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(start);
  const [endDate, setEndDate] = useState<Date | undefined>(end);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const onChangeIfRangeTrue = (dates: [Date, Date]) => {
    const [start, end] = dates;
    handleChangeDate(dates);
    setStartDate(start);
    setEndDate(end);
  };

  const onChangeIfRangeFalse = (date: Date) => {
    handleChangeDate([date]);
    setStartDate(date);
  };

  const dateToString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // TODO: 달력 close시 제출되게
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
