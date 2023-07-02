import { Outlet } from "react-router-dom";
import Header from "./header";

const Layout = () => {
  return (
    <div className="bg-white dark:bg-secondary-900">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
