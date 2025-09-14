type FormErrorsProps = { errors: string[] };

export function FormErrors({ errors }: FormErrorsProps) {
  return (
    <ul className="list-disc rounded-md bg-red-100 p-4 pl-8">
      {errors.map((error) => {
        return (
          <li key={error} className="font-semibold text-red-700">
            {error}
          </li>
        );
      })}
    </ul>
  );
}
