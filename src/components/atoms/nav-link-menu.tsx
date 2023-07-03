import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiChevronDown } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export type NavigationItem = {
  label: string;
  target: string;
  children?: NavigationItem[];
};

export interface NavigationLinkMenuProps extends NavigationItem {
  direction?: "to-bottom" | "to-top";
}

const NavigationLinkMenu = ({
  label,
  target,
  children,
  direction = "to-bottom",
}: NavigationLinkMenuProps) => {
  return children ? (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="flex items-center justify-center h-8 space-x-1 text-sm font-normal text-gray-900">
              <span>{label}</span>
              <HiChevronDown
                className={twMerge("w-4 h-4", open && "rotate-180")}
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className={twMerge(
                "absolute right-0 w-24 bg-white divide-y rounded-md shadow-lg divide-secondary-100 ring-1 ring-black ring-opacity-5 focus:outline-none",
                direction === "to-bottom" && "mt-2 origin-top-right",
                direction === "to-top" && "mb-2 origin-bottom-right bottom-6"
              )}
            >
              <div className="px-1 py-1">
                {children.map((ni) => (
                  <Menu.Item key={ni.label}>
                    <Link
                      to={ni.target}
                      className={twMerge(
                        "flex items-center w-full px-2 py-2 text-sm rounded-md hover:bg-secondary-100 disabled:opacity-50 disabled:pointer-events-none"
                      )}
                    >
                      {ni.label}
                    </Link>
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  ) : (
    <li>
      <Link
        to={target}
        className="flex items-center justify-center h-8 text-sm font-normal text-gray-900 rounded dark:text-secondary-100 hover:text-primary-500 dark:hover:text-primary-500"
      >
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default NavigationLinkMenu;
