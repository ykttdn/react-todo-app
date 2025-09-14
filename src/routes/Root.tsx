import { Outlet } from 'react-router';

export function Root() {
  return (
    <>
      <div className="m-4 max-w-screen-sm md:mx-auto">
        <h1 className="mb-3 text-4xl font-bold">Todos</h1>
        <Outlet />
      </div>
    </>
  );
}
