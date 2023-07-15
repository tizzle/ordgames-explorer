import { capitalizeFirstLetter } from "../../utils/string";
import MintedIndicator from "../atoms/minted-indicator";
import SupplyIndicator from "../atoms/supply-indicator";

export interface LootCardProps {
  lootClass: string;
  lootObject: string;
  power: number;
  supply: number;
  totalSupply?: number;
}

const LootCard = ({
  lootClass,
  lootObject,
  power,
  supply,
  totalSupply,
}: LootCardProps) => {
  return (
    <div className="flex flex-col p-4 space-y-2 bg-white rounded-lg dark:bg-secondary-900">
      <h3 className="flex-grow text-base font-medium dark:text-secondary-100 text-secondary-900">
        {capitalizeFirstLetter(lootClass)} — {capitalizeFirstLetter(lootObject)}
      </h3>
      <p className="flex items-end">
        <span className="flex-grow block font-medium leading-none tracking-widest uppercase truncate text-2xs text-secondary-500">
          Power
        </span>
        <span className="block text-xs font-medium leading-none text-right text-secondary-900 dark:text-secondary-100">
          {power}
        </span>
      </p>
      <p className="flex items-end">
        <span className="flex-grow block font-medium leading-none tracking-widest uppercase truncate text-2xs text-secondary-500">
          Supply
        </span>
        <SupplyIndicator supply={supply} totalSupply={totalSupply} />
      </p>
      <p className="flex items-end">
        <span className="flex-grow block font-medium leading-none tracking-widest uppercase truncate text-2xs text-secondary-500">
          Minted
        </span>
        <MintedIndicator supply={supply} totalSupply={totalSupply} />
      </p>
    </div>
  );
};

export default LootCard;
