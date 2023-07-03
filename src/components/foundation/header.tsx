import { Link } from "react-router-dom";
import navigationData from "../../data/navigation-data";
import NavigationLinkMenu from "../atoms/nav-link-menu";
import MobileMenu from "./mobile-menu";

const Header = () => {
  return (
    <div className="container-7xl">
      <nav className="py-5 mx-auto transition-all duration-200 bg-transparent navbar">
        <div className="flex items-center justify-between mx-auto">
          <div className="flex items-center navLink">
            <Link to="/" className="flex items-center mr-10">
              <span className="self-center text-lg font-bold whitespace-nowrap dark:text-secondary-100">
                ORDGAMES
              </span>
            </Link>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto">
            <ul className="flex flex-row items-center space-x-8 transition-all duration-200 bg-transparent">
              {navigationData.map((navLink) => (
                <NavigationLinkMenu
                  key={navLink.label}
                  label={navLink.label}
                  target={navLink.target}
                  children={navLink.children}
                />
              ))}
            </ul>
          </div>
          <div className="flex items-center md:hidden">
            <MobileMenu navigationData={navigationData} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
