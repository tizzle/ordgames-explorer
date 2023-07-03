import navigationData from "../../data/navigation-data";
import NavigationLinkMenu from "../atoms/nav-link-menu";

const Footer = () => {
  return (
    <footer className="w-full p-4 mx-auto space-y-2 container-7xl md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2023{" "}
        <a href="https://flowbite.com/" className="hover:underline">
          Ord Games
        </a>
        . No Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center space-x-6 text-sm font-medium text-gray-500 dark:text-gray-400">
        {navigationData.map((navLink) => (
          <NavigationLinkMenu
            key={navLink.label}
            label={navLink.label}
            target={navLink.target}
            children={navLink.children}
            direction="to-top"
          />
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
