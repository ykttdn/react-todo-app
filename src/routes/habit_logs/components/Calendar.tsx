import { useGetRequest } from '@/hooks/useGetRequest';
import dayjs from 'dayjs';
import { eachDayOfInterval } from '../lib/eachDayOfInterval';
import type { HabitLog } from '../types/HabitLog';
import { DayBlock } from './DayBlock';

type CalendarProps = { year: number; month: number };

export function Calendar({ year, month }: CalendarProps) {
  const beginningOfMonth = dayjs(`${year}-${month}-1`);
  const calendarStart = beginningOfMonth.startOf('week');
  const calendarEnd = calendarStart.add(41, 'day');

  const { data } = useGetRequest<HabitLog[]>(
    `http://localhost:3000/api/habit_logs?from=${calendarStart.format('YYYY-MM-DD')}&to=${calendarEnd.format('YYYY-MM-DD')}`,
  );
  const dataMap = new Map(data?.map((a) => [a.date, a]));
  const filledData = eachDayOfInterval({ start: calendarStart, end: calendarEnd }).map((day) => {
    const formattedDay = day.format('YYYY-MM-DD');
    return dataMap.get(formattedDay) ?? ({ date: formattedDay, level: 0 } satisfies HabitLog);
  });

  return (
    <div className="grid w-max grid-cols-7 gap-1">
      {filledData.map((dayData) => (
        <DayBlock key={dayData.date} data={dayData} year={year} month={month} />
      ))}
    </div>
  );
}
