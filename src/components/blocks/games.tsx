import GamesCard from "../cards/games-card";

export interface GamesProps {
  data: {
    title: string;
    image: string;
    id: string;
  }[];
}

const Games = ({ data }: GamesProps) => {
  return (
    <section className="py-16 container-7xl" id="games">
      <h4 className="text-2xl font-bold text-center text-gray-900 dark:text-secondary-100">
        <span>Latest</span> <span className="text-primary-500">Games</span>
      </h4>
      <div className="grid grid-cols-1 pt-12 md:grid-cols-2 gap-7">
        {data.map((game) => (
          <GamesCard
            key={game.id}
            title={game.title}
            image={game.image}
            id={game.id}
          />
        ))}
      </div>
    </section>
  );
};

export default Games;
