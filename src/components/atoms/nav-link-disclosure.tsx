import { Disclosure } from "@headlessui/react";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { Link } from "react-router-dom";

export type NavigationItem = {
  label: string;
  target: string;
  children?: NavigationItem[];
};

export interface NavigationLinkDisclosureProps extends NavigationItem {
  closeOnClick: () => void;
}

const NavigationLinkDisclosure = ({
  label,
  target,
  children,
  closeOnClick,
}: NavigationLinkDisclosureProps) => {
  return children ? (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex items-center justify-between">
            <span>{label}</span>
            <div className="flex items-center justify-center w-10 h-10">
              {open ? (
                <HiMinus className="w-5 h-5 text-primary-500" />
              ) : (
                <HiPlus className="w-5 h-5 text-primary-500" />
              )}
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="flex flex-col space-y-4">
            {children.map((i) => (
              <Link
                key={i.label}
                to={i.target}
                className="pl-6"
                onClick={closeOnClick}
              >
                {i.label}
              </Link>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  ) : (
    <li>
      <Link
        to={target}
        onClick={closeOnClick}
        className="text-base font-normal text-gray-900 rounded dark:text-secondary-100 hover:text-primary-500 dark:hover:text-primary-500"
      >
        {label}
      </Link>
    </li>
  );
};

export default NavigationLinkDisclosure;
