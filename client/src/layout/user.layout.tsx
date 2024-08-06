import { Header } from "@/components/app/header";
import { Outlet } from "react-router-dom";

export function UserLayout() {
  return (
    <main className="min-h-screen w-full">
      <div className="w-full ">
        <Header />
        {/* <div className="flex-grow flex items-center justify-center flex-col gap-3">
          <h1 className="font-bold tracking-wider text-6xl text-red-300 select-none italic">
            F<span className="text-[18px] font-semibold text-white">OODIE</span>
            D
            <span className="text-[18px] font-semibold text-white">ELIGHT</span>
          </h1>
          <h1 className="text-white text-4xl font-semibold">
            Discover the best food & drinks
          </h1>
        </div> */}
      </div>

      <section className="wrapper">
        <main>
          <Outlet />
        </main>
      </section>
    </main>
  );
}
