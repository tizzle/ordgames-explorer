import { Dialog } from "@headlessui/react";
import React from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { NavigationData } from "../../data/navigation-data";
import Button from "../atoms/button";
import NavigationLinkDisclosure from "../atoms/nav-link-disclosure";

export interface MobileMenuProps {
  navigationData: NavigationData;
}

const MobileMenu = ({ navigationData }: MobileMenuProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(true);

  const closeMobileMenu = React.useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const openMobileMenu = React.useCallback(() => {
    setMobileMenuOpen(true);
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        className="w-10 h-10 px-0 lg:hidden"
        onClick={openMobileMenu}
      >
        <HiBars3 className="w-6 h-6" aria-hidden="true" />
      </Button>

      <Dialog
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
        className="relative z-50"
      >
        <div className="fixed inset-0 overflow-y-auto bg-white dark:bg-secondary-900">
          <Dialog.Panel className="flex flex-col w-full h-full px-6 py-5 mx-auto">
            <div className="flex items-center justify-start w-full">
              <Link
                to="/"
                className="flex-grow text-lg font-bold uppercase text-secondary-900 dark:text-secondary-100"
              >
                Ordgames
              </Link>
              <Button
                variant="ghost"
                className="flex-shrink-0 w-10 p-0"
                onClick={closeMobileMenu}
              >
                <HiXMark className="w-6 h-6" />
              </Button>
            </div>
            <ul className="flex flex-col flex-grow py-6 space-y-4">
              {navigationData.map((navLink) => (
                <NavigationLinkDisclosure
                  key={navLink.label}
                  label={navLink.label}
                  target={navLink.target}
                  children={navLink.children}
                  closeOnClick={closeMobileMenu}
                />
              ))}
            </ul>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileMenu;
