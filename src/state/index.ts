import { createGlobalState } from "react-hooks-global-state";
import { Socket } from "socket.io-client";
import { GameBoot, GameStats, LootInscription } from "../types/games";
import { Wallet } from "../types/ordinals";

export type State = {
  ordGamesSocket?: Socket;
  isOrdGamesSocketConnected: boolean;
  tracSocket?: Socket;
  isTracSocketConnected: boolean;
  gameStats: {
    [key: string]: GameStats;
  };
  gameBoots: {
    [key: string]: GameBoot;
  };
  validPlayers: {
    [key: string]: boolean;
  };
  lootDetails: {
    [key: string]: LootInscription;
  };
  inscribedPositions: {
    [key: string]: number;
  };
  wallets: {
    [key: string]: Wallet;
  };
};

const initialState: State = {
  ordGamesSocket: undefined,
  isOrdGamesSocketConnected: false,
  tracSocket: undefined,
  isTracSocketConnected: false,
  gameStats: {},
  gameBoots: {},
  validPlayers: {},
  lootDetails: {},
  inscribedPositions: {},
  wallets: {},
};

const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState };
