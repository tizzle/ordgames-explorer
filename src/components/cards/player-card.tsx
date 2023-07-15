import { capitalizeFirstLetter } from "../../utils/string";
import MintedIndicator from "../atoms/minted-indicator";
import SupplyIndicator from "../atoms/supply-indicator";

export interface PlayerCardProps {
  playerClass: string;
  supply: number;
  totalSupply?: number;
}

const PlayerCard = ({ playerClass, supply, totalSupply }: PlayerCardProps) => {
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
        <MintedIndicator supply={supply} totalSupply={totalSupply} />
      </p>
    </div>
  );
};

export default PlayerCard;
