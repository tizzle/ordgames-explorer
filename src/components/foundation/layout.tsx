import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-secondary-900">
      <ScrollRestoration />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
