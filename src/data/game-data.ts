import ordjakImage from "../assets/ordjak-game-cover.webp";
import wizordsImage from "../assets/wizords-game-cover.webp";

export type GameData = {
  title: string;
  image: string;
  id: string;
}[];

const gameData: GameData = [
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

export default gameData;
