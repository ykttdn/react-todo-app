import dayjs from 'dayjs';
import { useState } from 'react';

export function useCalendar() {
  const today = dayjs();
  const [year, setYear] = useState(today.year());
  const [month, setMonth] = useState(today.month() + 1); // 1-indexed

  const changeMonth = (offset: 1 | -1) => {
    let newMonth = month + offset;
    let newYear = year;

    if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    } else if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    }

    setMonth(newMonth);
    setYear(newYear);
  };
  const resetMonth = () => {
    setYear(today.year());
    setMonth(today.month() + 1);
  };

  return { year, month, changeMonth, resetMonth };
}
