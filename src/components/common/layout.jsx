import { Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
