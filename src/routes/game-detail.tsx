import { Tab } from "@headlessui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import TabButton from "../components/atoms/tab-button";
import LootCard from "../components/cards/loot-card";
import PlayerCard from "../components/cards/player-card";
import gameData from "../data/game-data";
import { emit } from "../socket";
import { useGlobalState } from "../state";
import {
  LootByCategoryWithSupply,
  LootItem,
  LootItemObject,
  PlayerItem,
  PlayerItemObject,
} from "../types/games";

const GameDetailPage = () => {
  const { gameId } = useParams();

  const [ordGamesSocket] = useGlobalState("ordGamesSocket");
  const [isOrdGamesSocketConnected] = useGlobalState(
    "isOrdGamesSocketConnected"
  );

  const [gameBoots] = useGlobalState("gameBoots");
  const [gameStats] = useGlobalState("gameStats");

  const gameMetaData = React.useMemo(
    () => gameData.find((g) => g.id === gameId),
    [gameId]
  );

  React.useEffect(() => {
    const loadAllGameData = async ({
      socket,
      id,
    }: {
      socket: Socket;
      id: string;
    }) => {
      // ALWAYS
      // console.log("fetching game stats for", gameId);
      emit({
        socket,
        func: "gameStats",
        args: [id],
        call_id: "",
      });
      if (gameId && !gameBoots[gameId]) {
        // console.log("fetching game boot for", gameId);
        emit({
          socket,
          func: "ordinal",
          args: [id],
          call_id: "game-boot",
        });
      }
    };

    if (gameId && isOrdGamesSocketConnected && ordGamesSocket) {
      loadAllGameData({ socket: ordGamesSocket, id: gameId });
    }
  }, [gameId, ordGamesSocket, isOrdGamesSocketConnected, gameBoots]);

  const getBootLoot = React.useCallback(
    (loot: LootItem) => {
      if (gameId && gameBoots[gameId]) {
        return gameBoots[gameId].loot.find(
          (l) =>
            l[0].toLowerCase() === loot[0].toLowerCase() &&
            l[1].toLowerCase() === loot[1].toLowerCase()
        );
      }
      return undefined;
    },
    [gameId, gameBoots]
  );

  const getBootPlayer = React.useCallback(
    (player: PlayerItem) => {
      if (gameId && gameBoots[gameId]) {
        return gameBoots[gameId].players.find(
          (p) => p[0].toLowerCase() === player[0].toLowerCase()
        );
      }
      return undefined;
    },
    [gameId, gameBoots]
  );

  const lootByCategoryWithSupply: LootByCategoryWithSupply | undefined =
    React.useMemo(() => {
      return gameId && gameStats[gameId]
        ? gameStats[gameId].loot.reduce<LootByCategoryWithSupply>((acc, l) => {
            const bootItem = getBootLoot(l);
            const item: LootItemObject = {
              lootClass: l[0],
              lootObject: l[1],
              power: l[2],
              supply: l[3],
              totalSupply: bootItem ? parseInt(bootItem[3]) : undefined,
              inscriptionText: "",
            };

            if (!Array.isArray(acc[l[0]])) {
              acc[l[0]] = [item];
            } else {
              acc[l[0]].push(item);
            }
            return acc;
          }, {})
        : undefined;
    }, [gameId, gameStats, getBootLoot]);

  const playersWithSupply: PlayerItemObject[] | undefined =
    React.useMemo(() => {
      return gameId && gameStats[gameId]
        ? gameStats[gameId].players.map((p) => {
            const bootItem = getBootPlayer(p);

            const item: PlayerItemObject = {
              playerClass: p[0],
              supply: p[1],
              totalSupply: bootItem ? parseInt(bootItem[1]) : undefined,
            };

            return item;
          })
        : undefined;
    }, [gameId, gameStats, getBootPlayer]);

  return (
    <main className="flex flex-col flex-grow py-8 space-y-16 container-7xl">
      <section>
        {gameMetaData && (
          <div className="grid grid-cols-2 gap-12">
            <div className="col-span-2 sm:col-span-1">
              <img src={gameMetaData?.image} className=" rounded-xl" />
            </div>
            <div className="flex flex-col justify-center w-full col-span-2 space-y-8 sm:col-span-1">
              <h1 className="text-4xl font-bold text-secondary-900 dark:text-secondary-100">
                {gameMetaData.title}
              </h1>
              <div className="space-y-4">
                <div className="flex justify-center">
                  <p className="w-1/2 text-xs font-bold leading-none tracking-widest uppercase text-secondary-500">
                    Player Classes
                  </p>
                  <p className="w-1/2 font-bold leading-none text-secondary-900 dark:text-secondary-100">
                    {gameId &&
                      gameStats[gameId] &&
                      gameStats[gameId].players.length}
                  </p>
                </div>
                <div className="flex justify-center">
                  <p className="w-1/2 text-xs font-bold leading-none tracking-widest uppercase text-secondary-500">
                    Loot Classes
                  </p>
                  <p className="w-1/2 font-bold leading-none text-secondary-900 dark:text-secondary-100">
                    {gameId &&
                      gameStats[gameId] &&
                      gameStats[gameId].loot.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="overflow-hidden border bg-secondary-100 dark:bg-secondary-800 rounded-xl border-secondary-200 dark:border-secondary-700">
        <Tab.Group defaultIndex={1}>
          <Tab.List className="flex">
            <TabButton title="Players" />
            <TabButton title="Loot" />
          </Tab.List>
          <Tab.Panels className="p-6">
            <Tab.Panel className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {playersWithSupply &&
                playersWithSupply.map((p) => (
                  <PlayerCard
                    key={p.playerClass}
                    playerClass={p.playerClass}
                    supply={p.supply}
                    totalSupply={p.totalSupply}
                  />
                ))}
            </Tab.Panel>
            <Tab.Panel className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {lootByCategoryWithSupply &&
                Object.keys(lootByCategoryWithSupply).map((lootKey) => (
                  <React.Fragment key={lootKey}>
                    <div className="col-span-1 pt-4 font-medium tracking-widest text-center uppercase xs:col-span-2 sm:col-span-3 lg:col-span-4 xl:col-span-5 text-secondary-500">
                      {lootKey}
                    </div>
                    {lootByCategoryWithSupply[lootKey].map((l) => (
                      <LootCard
                        key={`${l.lootClass}-${l.lootObject}`}
                        lootClass={l.lootClass}
                        lootObject={l.lootObject}
                        power={l.power}
                        supply={l.supply}
                        totalSupply={l.totalSupply}
                      />
                    ))}
                  </React.Fragment>
                ))}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </section>
    </main>
  );
};

export default GameDetailPage;
