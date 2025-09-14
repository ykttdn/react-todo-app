export type Todo = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
};

export type TodoFormData = Omit<Todo, 'id' | 'created_at' | 'updated_at'>;
