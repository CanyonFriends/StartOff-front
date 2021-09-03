import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import * as Style from './styled';
// import 'react-datepicker/dist/react-datepicker.css';
import Overlay from '../../../Layout/Overlay';
import { dateToString } from '../../../../utils/date';

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

  return (
    <>
      {isCalendarOpen && <Overlay clickOverlay={() => setIsCalendarOpen(false)} />}
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
