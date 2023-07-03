import { NavigationItem } from "../components/atoms/nav-link-menu";
import gameData from "./game-data";

export type NavigationData = NavigationItem[];

const navigationData: NavigationData = [
  {
    label: "Home",
    target: "/",
  },
  {
    label: "Games",
    target: "",
    children: gameData.map((g) => ({
      label: g.title,
      target: `/games/${g.id}`,
      image: g.image,
    })),
  },
  {
    label: "About",
    target: "/about",
  },
];

export default navigationData;
