import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/foundation/layout.tsx";
import AboutPage from "./routes/about.tsx";
import CheckPositionPage from "./routes/check-loot.tsx";
import CheckPlayerPage from "./routes/check-player.tsx";
import CheckWalletPage from "./routes/check-wallet.tsx";
import ErrorPage from "./routes/error.tsx";
import GameDetailPage from "./routes/game-detail.tsx";
import HomePage from "./routes/home.tsx";
import { connectOrdGamesSocket, connectTracSocket } from "./socket/index.ts";
import { useGlobalState } from "./state/index.ts";
import { GameBoot, GameStats, LootInscription } from "./types/games";
import { EmitResponse, EmitResponseOrdinal } from "./types/socket";
import { isValidJSON5, parseJSON5 } from "./utils/json.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      {
        path: "/games/:gameId",
        element: <GameDetailPage />,
      },
      {
        path: "/tools/checkPlayer",
        element: <CheckPlayerPage />,
      },
      {
        path: "/tools/checkLoot",
        element: <CheckPositionPage />,
      },
      {
        path: "/tools/checkPosition",
        element: <CheckPositionPage />,
      },
      {
        path: "/tools/checkWallet",
        element: <CheckWalletPage />,
      },
    ],
  },
]);

const App = () => {
  const [tracSocket, setTracSocket] = useGlobalState("tracSocket");
  const [_itsc, setIsTracSocketConnected] = useGlobalState(
    "isTracSocketConnected"
  );

  const [ordGamesSocket, setOrdGamesSocket] = useGlobalState("ordGamesSocket");
  const [_iogsc, setIsOrdGamesSocketConnected] = useGlobalState(
    "isOrdGamesSocketConnected"
  );

  const [gameStats, setGameStats] = useGlobalState("gameStats");
  const [gameBoots, setGameBoots] = useGlobalState("gameBoots");
  const [validPlayers, setValidPlayers] = useGlobalState("validPlayers");
  const [lootDetails, setLootDetails] = useGlobalState("lootDetails");
  const [inscribedPositions, setInscribedPositions] =
    useGlobalState("inscribedPositions");

  React.useEffect(() => {
    console.log("connect trac socket");
    const ts = connectTracSocket();

    console.log("connect ord games socket");
    const os = connectOrdGamesSocket();

    ts.on("connect", () => {
      console.log("trac socket connected");
      setIsOrdGamesSocketConnected(true);
    });

    os.on("connect", () => {
      console.log("ordgames socket connected");
      setIsOrdGamesSocketConnected(true);
    });

    setTracSocket(ts);
    setOrdGamesSocket(os);
  }, [
    setTracSocket,
    setIsTracSocketConnected,
    setOrdGamesSocket,
    setIsOrdGamesSocketConnected,
  ]);

  // handle repsonses to ordgames socket
  React.useEffect(() => {
    if (ordGamesSocket) {
      ordGamesSocket.on("response", (msg: EmitResponse) => {
        switch (msg.func) {
          case "gameStats":
            setGameStats({
              ...gameStats,
              [msg.args[0]]: msg.result as GameStats,
            });
            break;
          case "ordinal":
            switch (msg.call_id) {
              case "game-boot":
                setGameBoots({
                  ...gameBoots,
                  [msg.args[0]]: parseJSON5(
                    atob((msg as EmitResponseOrdinal).result.content)
                  ) as GameBoot,
                });
                break;
              case "loot-details": {
                const content = atob(
                  (msg as EmitResponseOrdinal).result.content
                );
                if (isValidJSON5(content)) {
                  const lootItem = parseJSON5(content) as LootInscription;
                  // console.log("valid loot", lootItem);
                  setLootDetails({
                    ...lootDetails,
                    [msg.args[0]]: {
                      class: lootItem.class,
                      loot: lootItem.loot,
                      game: lootItem.game,
                      p: "og",
                      op: "loot",
                      inscriptionText: content,
                    },
                  });
                } else {
                  // console.log("invalid loot", content);
                  setLootDetails({
                    ...lootDetails,
                    [msg.args[0]]: {
                      class: "invalid inscription",
                      game: "invalid inscription",
                      loot: content,
                      p: "og",
                      op: "loot",
                      inscriptionText: content,
                    },
                  });
                }
              }
            }
            break;
          case "isValidPlayer":
            setValidPlayers({
              ...validPlayers,
              [msg.args[0]]: msg.result as boolean,
            });
            break;
          case "inscribedPosition":
            // console.log("inscribed position", msg);
            setInscribedPositions({
              ...inscribedPositions,
              [msg.args[0]]: msg.result as number,
            });
        }
      });
    }
  }, [
    ordGamesSocket,
    gameStats,
    gameBoots,
    validPlayers,
    lootDetails,
    inscribedPositions,
    setOrdGamesSocket,
    setGameStats,
    setGameBoots,
    setValidPlayers,
    setLootDetails,
    setInscribedPositions,
  ]);

  React.useEffect(() => {
    if (tracSocket) {
      tracSocket.on("response", (msg: EmitResponse) => {
        switch (msg.func) {
          case "wallet":
            console.log("wallet", msg);
            break;
        }
      });
    }
  }, [tracSocket]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
