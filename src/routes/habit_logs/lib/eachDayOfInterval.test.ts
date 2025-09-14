import dayjs from 'dayjs';
import { describe, expect, test } from 'vitest';
import { eachDayOfInterval } from './eachDayOfInterval';

describe('eachDayOfInterval', () => {
  test('returns days between start and end', () => {
    const start = dayjs('2025-01-01');
    const end = dayjs('2025-01-04');

    expect(eachDayOfInterval({ start, end })).toStrictEqual([
      dayjs('2025-01-01'),
      dayjs('2025-01-02'),
      dayjs('2025-01-03'),
      dayjs('2025-01-04'),
    ]);
  });
});
