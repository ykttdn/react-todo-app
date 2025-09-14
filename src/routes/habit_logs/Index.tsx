import { Button } from '@headlessui/react';
import dayjs from 'dayjs';
import { Calendar } from './components/Calendar';
import { useCalendar } from './hooks/useCalendar';

export function Index() {
  const { year, month, changeMonth, resetMonth } = useCalendar();

  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="w-max text-2xl">{dayjs(`${year}-${month}-1`).format('MMM YYYY')}</h2>
      <Calendar year={year} month={month} />
      <div className="flex w-max gap-2">
        <Button onClick={() => changeMonth(-1)} className="btn">
          ←
        </Button>
        <Button onClick={() => resetMonth()} className="btn">
          TODAY
        </Button>
        <Button onClick={() => changeMonth(1)} className="btn">
          →
        </Button>
      </div>
    </div>
  );
}
