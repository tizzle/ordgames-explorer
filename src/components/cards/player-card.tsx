import React from "react";
import { twMerge } from "tailwind-merge";
import { capitalizeFirstLetter } from "../../utils/string";
import SupplyIndicator from "../atoms/minted-indicator";

export interface PlayerCardProps {
  playerClass: string;
  supply: number;
  totalSupply?: number;
}

const PlayerCard = ({ playerClass, supply, totalSupply }: PlayerCardProps) => {
  const percentageMinted = React.useMemo(() => {
    return totalSupply ? (totalSupply - supply) / totalSupply : undefined;
  }, [supply, totalSupply]);

  return (
    <div className="flex flex-col p-4 space-y-2 bg-white rounded-lg dark:bg-secondary-900">
      <h3 className="flex-grow text-base font-medium text-secondary-900 dark:text-secondary-100">
        {capitalizeFirstLetter(playerClass)}
      </h3>
      <p className="flex items-end">
        <span className="flex-grow block font-medium leading-none tracking-widest uppercase truncate text-2xs text-secondary-500">
          Supply
        </span>
        <SupplyIndicator supply={supply} totalSupply={totalSupply} />
      </p>
      <p className="flex flex-row items-between">
        <span className="flex-grow block font-medium leading-none tracking-widest uppercase truncate text-2xs text-secondary-500">
          Minted
        </span>
        {percentageMinted && (
          <span
            className={twMerge(
              "block font-medium leading-none text-right text-xs text-secondary-500",
              percentageMinted === 0 && "text-red-500",
              percentageMinted <= 0.1 && "text-orange-500",
              percentageMinted < 0.5 && "text-yellow-500",
              percentageMinted >= 0.5 && "text-green-500"
            )}
          >
            {Math.ceil(percentageMinted * 100)} %
          </span>
        )}
      </p>
    </div>
  );
};

export default PlayerCard;
