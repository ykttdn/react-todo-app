import { Button, Field, Input, Label } from '@headlessui/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type { Todo, TodoFormData } from '../types/todo';
import { FormErrors } from './FormErrors';

type TodoFormProps = { todo: Todo };

export function TodoForm({ todo }: TodoFormProps) {
  const [errors, setErrors] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors: validationErrors, isDirty, isValid },
  } = useForm<TodoFormData>({
    defaultValues: {
      title: todo.title,
    },
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TodoFormData> = async (formData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/todos/${todo.id}`, {
        method: 'PATCH',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });
      const responseJson: { todo: Todo; error: [] } = await response.json();

      if (response.ok) {
        navigate('/');
      } else {
        setErrors(responseJson.error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        {errors.length > 0 && <FormErrors errors={errors} />}

        <Field className="flex flex-col gap-2">
          <Label htmlFor="title" className="font-medium">
            Title
          </Label>

          {validationErrors.title?.message && (
            <p className="text-red-700">{validationErrors.title?.message}</p>
          )}

          <Input
            id="title"
            className="input input-bordered"
            {...register('title', {
              required: "Title can't be blank",
              maxLength: { value: 140, message: 'Title is too long (maximum is 140 characters)' },
              pattern: { value: /^(?![\x20\u3000]*$).*/, message: "Title can't be blank" },
            })}
          />
        </Field>

        <Button type="submit" disabled={!(isDirty && isValid)} className="btn btn-neutral">
          Update
        </Button>
      </form>

      <ul className="mt-4">
        <li>created: {dayjs(todo.created_at).format('YYYY/MM/DD HH:mm:ss')}</li>
        <li>updated: {dayjs(todo.updated_at).format('YYYY/MM/DD HH:mm:ss')}</li>
      </ul>
    </>
  );
}
