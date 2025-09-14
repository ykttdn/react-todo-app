import { Link } from 'react-router';
import { useGetRequest } from '../../hooks/useGetRequest';
import { TodoList } from './components/TodoList';
import type { Todo } from './types/todo';

export function Index() {
  const {
    data: todos,
    error,
    isLoading,
  } = useGetRequest<Todo[]>('http://localhost:3000/api/todos');

  return (
    <>
      <div className="mb-2">
        <Link to={'todos/new'} className="btn btn-neutral">
          New todo
        </Link>
      </div>

      {isLoading ? (
        <p>Fetching todos...</p>
      ) : error ? (
        <p>Error occurred while fetching todos</p>
      ) : (
        todos && <TodoList initialTodos={todos} />
      )}
    </>
  );
}
