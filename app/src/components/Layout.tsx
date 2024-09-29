import { Header } from "@/components/Header";
import { Outlet } from "@tanstack/react-router";

export const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
