import { HiBars3 } from "react-icons/hi2";
import { Link } from "react-router-dom";
import ConnectionState from "./connection-state";

const Header = () => {
  return (
    <div className="container-7xl">
      <nav className="py-5 mx-auto transition-all duration-200 bg-transparent navbar">
        <div className="flex items-center justify-between mx-auto">
          <div className="flex items-center navLink">
            <Link to="/" className="flex items-center mr-10">
              <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-secondary-100">
                ORDGAMES
              </span>
            </Link>
          </div>
          <div className="items-center justify-between hidden w-full lg:flex lg:w-auto">
            <ul className="flex flex-row items-center transition-all duration-200 bg-transparent">
              <li className="px-[18px]">
                <Link
                  to="/"
                  className="text-sm font-normal text-gray-900 rounded dark:text-secondary-100 hover:text-primary-500 dark:hover:text-primary-500"
                >
                  Games
                </Link>
              </li>
              <li className="px-[18px]">
                <Link
                  to="/about"
                  className="text-sm font-normal text-gray-900 rounded dark:text-secondary-100 hover:text-primary-500 dark:hover:text-primary-500"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center">
            <ul className="flex items-center">
              <li>
                <ConnectionState />
              </li>
            </ul>
            <button
              data-target-drawer="mobile-navbar"
              className="flex items-center p-2 text-sm text-gray-500 rounded-lg drawer-handler lg:hidden"
            >
              <HiBars3 />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
