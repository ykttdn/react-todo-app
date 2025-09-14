import { server } from '@/mocks/node';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';
import type { Todo } from '../types/todo';
import { TodoForm } from './TodoForm';

const user = userEvent.setup();

const mockedNavigate = vi.fn();
vi.mock('react-router', async () => {
  const module = await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...module,
    useNavigate: () => mockedNavigate,
  };
});

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  const todo: Todo = {
    id: 1,
    title: 'do the dishes',
    created_at: '2025-01-01T00:00:00.000Z',
    updated_at: '2025-02-03T20:00:00.000Z',
  };

  render(<TodoForm todo={todo} />);
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('initial values', () => {
  test('initial values are set', () => {
    expect(screen.getByRole('textbox', { name: 'Title' })).toHaveValue('do the dishes');
  });
});

describe('validation', () => {
  describe('title', () => {
    test('invalid when title is blank', async () => {
      const titleTextBox = screen.getByRole('textbox', { name: 'Title' });
      await user.clear(titleTextBox);

      expect(screen.getByText("Title can't be blank")).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeDisabled();
    });

    test('invalid when title is too long', async () => {
      const titleTextBox = screen.getByRole('textbox', { name: 'Title' });
      await user.clear(titleTextBox);
      await user.type(titleTextBox, 'a'.repeat(141));

      expect(screen.getByText('Title is too long (maximum is 140 characters)')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeDisabled();
    });

    test('invalid when title includes only space', async () => {
      const titleTextBox = screen.getByRole('textbox', { name: 'Title' });
      await user.clear(titleTextBox);
      await user.type(titleTextBox, ' ');

      expect(screen.getByText("Title can't be blank")).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeDisabled();

      await user.clear(titleTextBox);
      await user.type(titleTextBox, '　'); // double-byte space

      expect(screen.getByText("Title can't be blank")).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeDisabled();
    });

    test('no errors are shown when input is valid', async () => {
      const titleTextBox = screen.getByRole('textbox', { name: 'Title' });
      await user.clear(titleTextBox);

      expect(screen.getByText("Title can't be blank")).toBeInTheDocument();

      await user.type(titleTextBox, 'foo');

      expect(screen.queryByText("Title can't be blank")).not.toBeInTheDocument();
    });
  });
});

describe('submit button', () => {
  test('initially disabled', () => {
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('enabled when fields are dirty', async () => {
    expect(screen.getByRole('button')).toBeDisabled();

    const titleTextBox = screen.getByRole('textbox', { name: 'Title' });
    await user.clear(titleTextBox);
    await user.type(titleTextBox, 'do the laundry');

    expect(screen.getByRole('button')).toBeEnabled();
  });

  test('disabled when same values are input', async () => {
    const titleTextBox = screen.getByRole('textbox', { name: 'Title' });
    await user.clear(titleTextBox);
    await user.type(titleTextBox, 'do the dishes');

    expect(screen.getByRole('button')).toBeDisabled();
  });
});

describe('submission', () => {
  describe('when succeeds', () => {
    test('navigate to root page', async () => {
      const titleTextBox = screen.getByRole('textbox', { name: 'Title' });
      await user.clear(titleTextBox);
      await user.type(titleTextBox, 'do the laundry');

      await user.click(screen.getByRole('button'));

      expect(mockedNavigate).toHaveBeenCalledWith('/');
    });
  });
});
