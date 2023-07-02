import { Tab } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

export interface TabButtonProps {
  title: string;
}

const TabButton = ({ title }: TabButtonProps) => {
  return (
    <Tab
      className={({ selected }) =>
        twMerge(
          "w-full text-base font-bold text-secondary-900 dark:text-secondary-100 border-b-2 border-b-secondary-200 dark:border-b-secondary-700 py-4 bg-white dark:bg-secondary-900",
          "focus:outline-none",
          selected &&
            "border-b-2 border-b-primary-500 text-primary-500 dark:text-primary-500 dark:border-b-primary-500",
          !selected && "hover:text-secondary-800 dark:hover:text-secondary-300"
        )
      }
    >
      {title}
    </Tab>
  );
};

export default TabButton;
