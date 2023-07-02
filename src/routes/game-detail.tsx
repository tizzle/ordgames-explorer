import { Tab } from "@headlessui/react";
import React from "react";
import { useLoaderData } from "react-router-dom";
import TabButton from "../components/atoms/tab-button";
import LootCard from "../components/cards/loot-card";
import PlayerCard from "../components/cards/player-card";

export type PlayerItem = [string, number];
export type LootItem = [string, string, number, number];

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

export type LootByCategory = {
  [key: string]: LootItem[];
};

const GameDetailPage = () => {
  const { result } = useLoaderData() as GamesDetailData;

  const lootByCategory: LootByCategory = React.useMemo(() => {
    return result.loot.reduce<LootByCategory>((acc, l) => {
      if (!Array.isArray(acc[l[0]])) {
        acc[l[0]] = [l];
      } else {
        acc[l[0]].push(l);
      }
      return acc;
    }, {});
  }, [result]);

  // console.log(lootByCategory);

  return (
    <main>
      {/* <section className="container-7xl">Game Detail page</section> */}

      <section className="py-16 container-7xl">
        <div className="overflow-hidden border bg-secondary-100 dark:bg-secondary-800 rounded-xl border-secondary-200 dark:border-secondary-700">
          <Tab.Group>
            <Tab.List className="flex">
              <TabButton title="Players" />
              <TabButton title="Loot" />
            </Tab.List>
            <Tab.Panels className="p-6">
              <Tab.Panel className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {result.players.map((p) => (
                  <PlayerCard key={p[0]} playerClass={p[0]} supply={p[1]} />
                ))}
              </Tab.Panel>
              <Tab.Panel className="grid grid-cols-6 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {Object.keys(lootByCategory).map((lootKey) => (
                  <React.Fragment key={lootKey}>
                    <div className="col-span-12 pt-4 font-medium tracking-widest text-center uppercase sm:col-span-3 md:col-span-4 lg:col-span-5 xl:col-span-6 text-secondary-500">
                      {lootKey}
                    </div>
                    {lootByCategory[lootKey].map((l) => (
                      <LootCard
                        key={`${l[0]}-${l[1]}`}
                        lootClass={l[0]}
                        lootObject={l[1]}
                        power={l[2]}
                        supply={l[3]}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </main>
  );
};

export default GameDetailPage;
