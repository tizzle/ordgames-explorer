import Games from "../components/blocks/games";
import Hero from "../components/blocks/hero";

import ordjakImage from "../assets/ordjak-game-cover.jpeg";
import wizordsImage from "../assets/wizords-game-cover.webp";

const gameData = [
  {
    title: "Wizords",
    image: wizordsImage,
    id: "cd282b9b1658ca3010221f6fb088d77e56dede84329c431aa1c60cd4075a02a9i0",
  },
  {
    title: "Ordjak",
    image: ordjakImage,
    id: "005cac3862fe816b8217b3cff44e72b14a5e040d4f00302a468cd43d1a86ee2ei0",
  },
];

const HomePage = () => {
  console.log("rendering home");
  return (
    <div className="container mx-auto">
      <Hero />
      <Games data={gameData} />
    </div>
  );
};

export default HomePage;
