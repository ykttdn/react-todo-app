import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';
import { Root } from './routes/Root.tsx';
import { Index as HabitLogsIndex } from './routes/habit_logs/Index.tsx';
import { EditTodo } from './routes/todos/EditTodo.tsx';
import { Index } from './routes/todos/Index.tsx';
import { NewTodo } from './routes/todos/NewTodo.tsx';

// biome-ignore lint/style/noNonNullAssertion:
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Root />}>
          <Route path="/" element={<Index />} />
          <Route path="todos/:id/edit" element={<EditTodo />} />
          <Route path="todos/new" element={<NewTodo />} />
        </Route>
        <Route path="habit_logs" element={<HabitLogsIndex />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
