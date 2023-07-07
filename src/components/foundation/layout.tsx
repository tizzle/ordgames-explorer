import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import ResponsiveSizes from "./responsive-sizes";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-secondary-900">
      <ScrollRestoration />
      <Header />
      <Outlet />
      <Footer />
      <ResponsiveSizes />
    </div>
  );
};

export default Layout;
