import Games from "../components/blocks/games";
import Hero from "../components/blocks/hero";
import gameData from "../data/game-data";

const HomePage = () => {
  console.log("rendering home");
  return (
    <div className="container py-8 mx-auto space-y-8">
      <Hero />
      <Games data={gameData} />
    </div>
  );
};

export default HomePage;
