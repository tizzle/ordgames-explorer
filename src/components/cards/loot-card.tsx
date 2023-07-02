import { twMerge } from "tailwind-merge";
import { capitalizeFirstLetter } from "../../utils/string";

export interface LootCardProps {
  lootClass: string;
  lootObject: string;
  power: number;
  supply: number;
}

const LootCard = ({ lootClass, lootObject, power, supply }: LootCardProps) => {
  return (
    <div className="flex flex-col p-4 space-y-2 bg-white rounded-lg">
      <h3 className="flex-grow text-base font-medium">
        {capitalizeFirstLetter(lootClass)} — {capitalizeFirstLetter(lootObject)}
      </h3>
      <p className="flex items-end">
        <span className="block w-full text-xs font-medium leading-none tracking-widest uppercase text-secondary-500">
          Power
        </span>
        <span className="block w-full font-medium leading-none text-right">
          {power}
        </span>
      </p>
      <p className="flex items-end">
        <span className="block w-full text-xs font-medium leading-none tracking-widest uppercase text-secondary-500">
          Supply
        </span>
        <span
          className={twMerge(
            "block w-full font-medium leading-none text-right",
            supply === 0 && "text-red-500",
            supply <= 100 && "text-orange-500",
            supply >= 100 && "text-green-500"
          )}
        >
          {supply}
        </span>
      </p>
    </div>
  );
};

export default LootCard;
