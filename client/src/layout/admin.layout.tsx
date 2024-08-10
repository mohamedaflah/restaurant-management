import { Outlet } from "react-router-dom";

export function AdminLayout() {
  return (
    <main className="min-h-screen w-full">
      <div className="w-full ">
        <header className="w-full h-16 px-5 flex items-center border-b">
          <span>Admin section</span>
        </header>
      </div>
      <section className="wrapper">
        <main>
          <Outlet />
        </main>
      </section>
    </main>
  );
}
