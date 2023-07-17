export type PlayerItem = [string, number];
export type PlayerItemObject = {
  playerClass: string;
  supply: number;
  totalSupply?: number;
};

export type LootInscription = {
  p: "og";
  op: "loot";
  game: string;
  class: string;
  loot: string;
  inscriptionText: string;
};

export type LootItem = [string, string, number, number];
export type LootItemObject = {
  lootClass: string;
  lootObject: string;
  power: number;
  supply: number;
  totalSupply?: number;
  inscriptionText: string;
};

export type GameStats = {
  loot: LootItem[];
  players: PlayerItem[];
};

export type GameBoot = {
  p: "og";
  v: string;
  op: "boot";
  name: string;
  avatar: string;
  players: [string, string][];
  loot: [string, string, string, string][];
};

export type LootByCategoryWithSupply = {
  [key: string]: LootItemObject[];
};
