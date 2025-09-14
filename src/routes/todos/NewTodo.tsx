import { Button, Field, Input, Label } from '@headlessui/react';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { FormErrors } from './components/FormErrors';
import type { TodoFormData } from './types/todo';

export function NewTodo() {
  const [errors, setErrors] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors: validationErrors, isValid },
  } = useForm<TodoFormData>({
    mode: 'onChange',
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TodoFormData> = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/api/todos', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        navigate('/');
      } else {
        const responseJson: { todo: null; error: [] } = await response.json();
        setErrors(responseJson.error);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <h2 className="text-3xl font-semibold">New Todo</h2>
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

        <Button type="submit" disabled={!isValid} className="btn btn-neutral">
          Submit
        </Button>
      </form>
    </>
  );
}
