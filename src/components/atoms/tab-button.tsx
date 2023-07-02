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
          "w-full text-base font-bold text-secondary-900 border-b-2 border-b-secondary-200 py-4 bg-white",
          "focus:outline-none",
          selected && "border-b-2 border-b-primary-500 text-primary-500",
          !selected && "hover:text-secondary-800"
        )
      }
    >
      {title}
    </Tab>
  );
};

export default TabButton;
