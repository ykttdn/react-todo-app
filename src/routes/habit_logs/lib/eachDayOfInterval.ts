import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);

export const eachDayOfInterval = ({ start, end }: { start: dayjs.Dayjs; end: dayjs.Dayjs }) => {
  const dates = [];
  let current = start;

  while (current.isSameOrBefore(end, 'day')) {
    dates.push(current);
    current = current.add(1, 'day');
  }

  return dates;
};
