import React from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const Button = React.forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      className,
      children,
      ...rest
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          "flex justify-center items-center font-medium focus:outline-none transition-colors rounded",
          size === "xs" && "px-2 text-2xs h-6",
          size === "sm" && "px-3 text-xs h-8",
          size === "md" && "px-3 text-sm h-10",
          size === "lg" && "px-4 text-base h-12",
          size === "xl" && "px-6 text-lg h-16",
          variant === "primary" &&
            "bg-primary-500 text-white hover:bg-primary-400 focus:ring-4 focus:ring-primary-300",
          variant === "secondary" &&
            "bg-secondary-200 text-secondary-900 hover:bg-secondary-100 focus:ring-4 focus:ring-secondary-300",
          variant === "outline" &&
            "bg-transparent text-primary-500 border border-secondary-300 hover:border-secondary-200 dark:text-white hover:dark:border-secondary-800 focus:ring-4 focus:ring-secondary-300 dark:border-secondary-700 dark:focus:ring-secondary-800",
          variant === "ghost" &&
            "bg-transparent text-primary-500 dark:text-white hover:bg-secondary-100 focus:ring-4 focus:ring-secondary-300 dark:hover:bg-secondary-700 dark:focus:ring-secondary-800",
          variant === "link" && "text-primary-500 px-0 hover:text-primary-400",
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default Button;
