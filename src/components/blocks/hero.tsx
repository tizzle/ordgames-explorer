import heroImage from "../../assets/ord-games-header.png";
import Link from "../atoms/link";

const Hero = () => {
  return (
    <div className="mx-auto container-7xl">
      <div className="max-w-screen-md mx-auto space-y-8 text-center">
        <h2 className="overflow-hidden text-2xl font-semibold rounded-xl text-secondary-900 md:text-6xl dark:text-secondary-100">
          <img src={heroImage} alt="Ord Games" />
        </h2>
        <p className="text-sm font-normal text-secondary-700 md:text-base dark:text-secondary-400">
          Ord Games is a standard for designing Bitcoin games and was inspired
          by Sats Names, BRC-20, Loot and other popular NFT games.
        </p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row">
          <Link external={true} to="#games" variant="primary" size="lg">
            Explore the Games
          </Link>
          <Link external={true} to="https://docs.ord.games/" variant="outline">
            Learn about the prototcol
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
