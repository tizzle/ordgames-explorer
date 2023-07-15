import React from "react";
import { twMerge } from "tailwind-merge";

export interface SupplyIndicatorProps {
  supply: number;
  totalSupply?: number;
}

const SupplyIndicator = ({ supply, totalSupply }: SupplyIndicatorProps) => {
  const percentageLeft = React.useMemo(() => {
    return totalSupply !== undefined ? supply / totalSupply : undefined;
  }, [supply, totalSupply]);

  console.log(percentageLeft);

  return (
    <span
      className={twMerge(
        "block font-medium leading-none text-right text-xs text-white",
        percentageLeft !== undefined &&
          percentageLeft > 0.5 &&
          "text-green-500",
        percentageLeft !== undefined &&
          percentageLeft <= 0.5 &&
          "text-yellow-500",
        percentageLeft !== undefined &&
          percentageLeft <= 0.1 &&
          "text-orange-500",
        supply === 0 && "text-red-500"
      )}
    >
      {supply}
      {totalSupply && ` / ${totalSupply}`}
    </span>
  );
};

export default SupplyIndicator;
