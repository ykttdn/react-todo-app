import dayjs from 'dayjs';
import type { HabitLog } from '../types/HabitLog';

type DayBlockProps = { data: HabitLog; year: number; month: number };

export function DayBlock({ data, year, month }: DayBlockProps) {
  const colors = ['bg-gray-100', 'bg-green-200', 'bg-green-400', 'bg-green-600'];
  const fontWeight = (date: dayjs.Dayjs) => {
    if (date.isSame(dayjs(), 'day')) {
      return 'font-black';
    }
    if (date.isSame(new Date(year, month - 1, 1), 'month')) {
      return 'font-medium';
    }
    return 'font-extralight';
  };

  return (
    <div
      className={`grid h-10 w-10 place-items-center rounded-md ${colors[data.level]}`}
      title={data.date}
    >
      <div className={`${fontWeight(dayjs(data.date))}`}>{dayjs(data.date).date()}</div>
    </div>
  );
}
