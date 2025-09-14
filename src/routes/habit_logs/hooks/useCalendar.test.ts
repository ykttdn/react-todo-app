import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { useCalendar } from './useCalendar';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useCalendar', () => {
  test('sets current year and month', () => {
    vi.setSystemTime('2025-02-04');

    const { result } = renderHook(() => useCalendar());

    expect(result.current.year).toBe(2025);
    expect(result.current.month).toBe(2);
  });

  describe('changeMonth', () => {
    test('increments month', () => {
      vi.setSystemTime('2025-02-04');

      const { result } = renderHook(() => useCalendar());

      act(() => result.current.changeMonth(1));

      expect(result.current.year).toBe(2025);
      expect(result.current.month).toBe(3);
    });

    test('increments both year and month if it is December', () => {
      vi.setSystemTime('2025-12-04');

      const { result } = renderHook(() => useCalendar());

      act(() => result.current.changeMonth(1));

      expect(result.current.year).toBe(2026);
      expect(result.current.month).toBe(1);
    });

    test('decrements month', () => {
      vi.setSystemTime('2025-02-04');

      const { result } = renderHook(() => useCalendar());

      act(() => result.current.changeMonth(-1));

      expect(result.current.year).toBe(2025);
      expect(result.current.month).toBe(1);
    });

    test('decrements both year and month if it is January', () => {
      vi.setSystemTime('2025-01-04');

      const { result } = renderHook(() => useCalendar());

      act(() => result.current.changeMonth(-1));

      expect(result.current.year).toBe(2024);
      expect(result.current.month).toBe(12);
    });
  });

  describe('resetMonth', () => {
    test('resets both year and month', () => {
      vi.setSystemTime('2025-12-04');

      const { result } = renderHook(() => useCalendar());

      act(() => result.current.changeMonth(1));
      act(() => result.current.resetMonth());

      expect(result.current.year).toBe(2025);
      expect(result.current.month).toBe(12);
    });
  });
});
