import { useState } from 'react';
import { Link } from 'react-router';
import type { Todo } from '../types/todo';

type TodoListProps = {
  initialTodos: Todo[];
};

export function TodoList({ initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState(initialTodos);

  const handleClick = async (id: number, title: string) => {
    if (
      !window.confirm(
        `Do you want to delete the todo "${title}"? (This operation cannot be undone)`,
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
      } else {
        window.alert('Failed to delete todo');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ol className="flex flex-col gap-2">
      {todos.map((todo) => {
        return (
          <li key={todo.id} className="flex items-center rounded-lg border-2 border-gray-200">
            <Link
              to={`todos/${todo.id}/edit`}
              className="block grow p-6 text-2xl font-semibold text-gray-600 hover:text-orange-500"
            >
              {todo.title}
            </Link>
            <div className="pr-4">
              <button
                type="button"
                className="btn btn-outline btn-error"
                onClick={() => handleClick(todo.id, todo.title)}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
