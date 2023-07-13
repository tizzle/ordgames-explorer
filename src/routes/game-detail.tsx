import { Tab } from "@headlessui/react";
import React from "react";
import { useLoaderData } from "react-router-dom";
import TabButton from "../components/atoms/tab-button";
import LootCard from "../components/cards/loot-card";
import PlayerCard from "../components/cards/player-card";
import gameData from "../data/game-data";
import { emitPromise } from "../socket";
import { Ordinal } from "../types/ordinals";
import { parseJSON5 } from "../utils/json";

export type PlayerItem = [string, number];
export type PlayerItemObject = {
  playerClass: string;
  supply: number;
  totalSupply?: number;
};

export type LootItem = [string, string, number, number];
export type LootItemObject = {
  lootClass: string;
  lootObject: string;
  power: number;
  supply: number;
  totalSupply?: number;
};

export type GamesDetailData = {
  args: string[];
  call_id: string;
  error: string;
  func: string;
  result: {
    loot: LootItem[];
    players: PlayerItem[];
  };
};

export type GameBootData = {
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

const GameDetailPage = () => {
  const { result, args } = useLoaderData() as GamesDetailData;
  const [bootData, setBootData] = React.useState<GameBootData>();

  const gameMetaData = React.useMemo(
    () => gameData.find((g) => g.id === args[0]),
    [args]
  );

  React.useEffect(() => {
    const loadBootData = async () => {
      {
        if (gameMetaData) {
          const ordinalResponse = await emitPromise({
            func: "ordinal",
            args: [gameMetaData.id],
            call_id: "",
          });

          const ordinal = ordinalResponse.result as Ordinal;
          const data = parseJSON5(atob(ordinal.content));
          setBootData(data);
        }
      }
    };
    loadBootData();
  }, [gameMetaData]);

  const getBootLoot = React.useCallback(
    (loot: LootItem) => {
      if (bootData) {
        return bootData.loot.find((l) => l[0] === loot[0] && l[1] === loot[1]);
      }
      return undefined;
    },
    [bootData]
  );

  const getBootPlayer = React.useCallback(
    (player: PlayerItem) => {
      if (bootData) {
        return bootData.players.find((p) => p[0] === player[0]);
      }
      return undefined;
    },
    [bootData]
  );

  const lootByCategoryWithSupply: LootByCategoryWithSupply =
    React.useMemo(() => {
      return result.loot.reduce<LootByCategoryWithSupply>((acc, l) => {
        const bootItem = getBootLoot(l);

        const item = {
          lootClass: l[0],
          lootObject: l[1],
          power: l[2],
          supply: l[3],
          totalSupply: bootItem ? parseInt(bootItem[3]) : undefined,
        };

        if (!Array.isArray(acc[l[0]])) {
          acc[l[0]] = [item];
        } else {
          acc[l[0]].push(item);
        }
        return acc;
      }, {});
    }, [result, getBootLoot]);

  const playersWithSupply: PlayerItemObject[] = React.useMemo(() => {
    return result.players.map((p) => {
      const bootItem = getBootPlayer(p);

      const item: PlayerItemObject = {
        playerClass: p[0],
        supply: p[1],
        totalSupply: bootItem ? parseInt(bootItem[1]) : undefined,
      };

      return item;
    });
  }, [result, getBootPlayer]);

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
                    {result.players.length}
                  </p>
                </div>
                <div className="flex justify-center">
                  <p className="w-1/2 text-xs font-bold leading-none tracking-widest uppercase text-secondary-500">
                    Loot Classes
                  </p>
                  <p className="w-1/2 font-bold leading-none text-secondary-900 dark:text-secondary-100">
                    {result.loot.length}
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
              {playersWithSupply.map((p) => (
                <PlayerCard
                  key={p.playerClass}
                  playerClass={p.playerClass}
                  supply={p.supply}
                  totalSupply={p.totalSupply}
                />
              ))}
            </Tab.Panel>
            <Tab.Panel className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {Object.keys(lootByCategoryWithSupply).map((lootKey) => (
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
