import type { Todo } from '@/routes/todos/types/todo';
import { http, HttpResponse } from 'msw';

const requestPath = 'http://localhost:3000/api/todos/:id';

type Params = {
  id: string;
};

type RequestBody = {
  title: string;
};

type ResponseBody = { todo: Todo; error: [] };

type RequestPath = typeof requestPath;

export const updateTodoHandler = http.patch<Params, RequestBody, ResponseBody, RequestPath>(
  requestPath,
  async ({ request, params }) => {
    const { id } = params;
    const updatedTodo = await request.json();

    return HttpResponse.json({
      todo: {
        id: Number.parseInt(id, 10),
        title: updatedTodo.title,
        created_at: '2025-01-01T00:00:00.000Z',
        updated_at: '2025-02-03T20:00:00.000Z',
      },
      error: [],
    });
  },
);
