import { Link } from "react-router-dom";

export interface GamesCardProps {
  title: string;
  image: string;
  id: string;
  // numPlayers?: number;
  // numLoot?: number;
}

const GamesCard = ({ title, image, id }: GamesCardProps) => {
  return (
    <Link
      to={`games/${id}`}
      className="relative p-2 transition-all bg-white border border-gray-300 shadow-outline dark:bg-secondary-800 rounded-xl group dark:bg-dark dark:border-gray-800 hover:shadow-hover hover:border-primary-500"
    >
      <img
        src={image}
        className="flex items-end justify-center object-cover w-full h-64 rounded-lg"
        alt=""
      />
      <div className="px-2 pt-3 pb-2">
        <h3 className="text-lg font-medium text-gray-900 transition-all group-hover:text-primary-500 dark:text-secondary-100">
          {title}
        </h3>
        {/* <div>
          <small className="flex items-center mb-1 text-gray-700 dark:text-gray-400">
            Price
            <span className="font-medium text-gray-900 dark:text-secondary-100">
              12.777
            </span>
          </small>
          <div className="flex items-center justify-between">
            <small className="flex items-center text-gray-700 dark:text-gray-400">
              {" "}
              Offer for{" "}
              <span className="text-gray-900 dark:text-secondary-100">10.777</span>
            </small>
            <small className="text-gray-700 dark:text-gray-400">
              {" "}
              Highest bid 2/31{" "}
            </small>
          </div>
        </div> */}
      </div>
    </Link>
  );
};

export default GamesCard;
