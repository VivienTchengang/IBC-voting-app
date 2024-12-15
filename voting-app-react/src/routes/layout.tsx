import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <section className="md:min-h-[580px] h-dvh w-full bg-slate-200 flex justify-center items-center md:py-4">
      <section className="w-full h-full relative flex flex-col md:w-96 bg-primary">
        <Outlet />
      </section>
    </section>
  )
}