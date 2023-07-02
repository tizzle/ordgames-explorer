import { twMerge } from "tailwind-merge";
import { capitalizeFirstLetter } from "../../utils/string";

export interface PlayerCardProps {
  playerClass: string;
  supply: number;
}

const PlayerCard = ({ playerClass, supply }: PlayerCardProps) => {
  return (
    <div className="flex flex-col p-4 space-y-2 bg-white rounded-lg dark:bg-secondary-900">
      <h3 className="flex-grow text-base font-medium text-secondary-900 dark:text-secondary-100">
        {capitalizeFirstLetter(playerClass)}
      </h3>
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

export default PlayerCard;
