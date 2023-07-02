import React from "react";
import { Link as RRDLink, LinkProps as RRDLinkProps } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export interface LinkProps extends RRDLinkProps {
  external?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const Link = React.forwardRef(
  (
    {
      external = false,
      variant = "primary",
      size = "md",
      to,
      className,
      children,
      ...rest
    }: LinkProps,
    ref: React.Ref<HTMLAnchorElement>
  ) => {
    const cN = React.useMemo(() => {
      return twMerge(
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
      );
    }, [size, variant, className]);

    return external ? (
      <a ref={ref} className={cN} href={to as string} {...rest}>
        {children}
      </a>
    ) : (
      <RRDLink ref={ref} className={cN} to={to} {...rest}>
        {children}
      </RRDLink>
    );
  }
);

export default Link;
