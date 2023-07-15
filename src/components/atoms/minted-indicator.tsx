import React from "react";
import { twMerge } from "tailwind-merge";

export interface MintedIndicatorProps {
  supply: number;
  totalSupply?: number;
}

const MintedIndicator = ({ supply, totalSupply }: MintedIndicatorProps) => {
  const percentageMinted = React.useMemo(() => {
    return totalSupply !== undefined
      ? (totalSupply - supply) / totalSupply
      : undefined;
  }, [supply, totalSupply]);

  return (
    <span
      className={twMerge(
        "block font-medium leading-none text-right text-xs text-white",
        percentageMinted !== undefined &&
          percentageMinted <= 0.5 &&
          "text-green-500",
        percentageMinted !== undefined &&
          percentageMinted > 0.5 &&
          "text-yellow-500",
        percentageMinted !== undefined &&
          percentageMinted > 0.9 &&
          "text-orange-500",
        percentageMinted !== undefined &&
          percentageMinted === 1 &&
          "text-red-500"
      )}
    >
      {percentageMinted !== undefined ? Math.ceil(percentageMinted * 100) : "—"}{" "}
      %
    </span>
  );
};

export default MintedIndicator;
