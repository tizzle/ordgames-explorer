import React from "react";
// import { twMerge } from "tailwind-merge";
import { HiCheckCircle, HiXCircle } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
import Button from "../components/atoms/button";
import { emit } from "../socket";
import { useGlobalState } from "../state";

export type CheckResult = {
  type: "success" | "badFormat";
  message: string | React.ReactNode;
  code?: string;
};

const CheckPositionPage = () => {
  const [ordGamesSocket] = useGlobalState("ordGamesSocket");
  const [isOrdGamesSocketConnected] = useGlobalState(
    "isOrdGamesSocketConnected"
  );

  const [fieldValues, setFieldValues] = React.useState<{
    [key: string]: unknown;
  }>({});

  const [lootDetails] = useGlobalState("lootDetails");
  const [inscribedPositions] = useGlobalState("inscribedPositions");
  const [gameBoots] = useGlobalState("gameBoots");

  const [lootId, setLootId] = React.useState<string>();
  const shortLootId = React.useMemo(() => {
    return lootId && `${lootId.slice(0, 8)}...${lootId.slice(-8)}`;
  }, [lootId]);

  const [gameId, setGameId] = React.useState<string>();
  // const shortGameId = React.useMemo(() => {
  //   return gameId && `${gameId.slice(0, 8)}...${gameId.slice(-8)}`;
  // }, [gameId]);

  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValues({
        ...fieldValues,
        [event.target.name]: event.target.value,
      });
    },
    [fieldValues]
  );

  const handleInputBlur = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (event.target.value === "" || !event.target.value) {
        switch (event.target.name) {
          case "inscription-id":
            event.target.setCustomValidity("Please enter an inscription id.");
            break;
        }
      } else {
        event.target.setCustomValidity("");
      }
    },
    []
  );

  // GET THE LOOT INSCRIPTION TO CHECK IF IT IS A VALID JSON5
  const handleSubmit = React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      if (ordGamesSocket && isOrdGamesSocketConnected) {
        emit({
          socket: ordGamesSocket,
          func: "ordinal",
          args: [fieldValues["inscription-id"] as string],
          call_id: "loot-details",
        });

        setLootId(fieldValues["inscription-id"] as string);
      }
    },
    [fieldValues, ordGamesSocket, isOrdGamesSocketConnected]
  );

  // GET INSCRIPTION POSITION OF THE LOOT
  React.useEffect(() => {
    if (
      ordGamesSocket &&
      isOrdGamesSocketConnected &&
      lootId &&
      lootDetails[lootId]
    ) {
      emit({
        socket: ordGamesSocket,
        func: "inscribedPosition",
        args: [lootId],
        call_id: "inscribed-positions",
      });
    }
  }, [ordGamesSocket, isOrdGamesSocketConnected, lootId, lootDetails]);

  // GET GAME BOOT TO CHECK MAX SUPPLY TO CHECK IF WITHIN
  React.useEffect(() => {
    if (
      ordGamesSocket &&
      isOrdGamesSocketConnected &&
      lootId &&
      lootDetails[lootId]
    ) {
      const lootDetail = lootDetails[lootId];
      if (lootDetail.class !== "invalid inscription") {
        const lootGame = lootDetail.game;
        setGameId(lootGame);

        if (!gameBoots[lootGame])
          emit({
            socket: ordGamesSocket,
            func: "ordinal",
            args: [lootGame],
            call_id: "game-boot",
          });
      }
    }
  }, [
    ordGamesSocket,
    isOrdGamesSocketConnected,
    lootId,
    lootDetails,
    gameBoots,
  ]);

  const getTotalSupply = React.useCallback(
    (lootClass: string, lootObject: string) => {
      if (gameId && gameBoots[gameId]) {
        // console.log("finding loot in boot", lootClass, lootObject);
        const loot = gameBoots[gameId].loot.find(
          (l) => l[0] === lootClass && l[1] === lootObject
        );
        if (loot) {
          // console.log("found boot loot item", loot);
          return parseInt(loot[3], 10);
        }
      }
      return 0;
    },
    [gameId, gameBoots]
  );

  const checkDetails = React.useMemo(() => {
    if (lootId && lootDetails[lootId]) {
      const lootDetail = lootDetails[lootId];
      if (lootDetail.class !== "invalid inscription") {
        const position = inscribedPositions[lootId] as number;
        const totalSupply = getTotalSupply(lootDetail.class, lootDetail.loot);
        if (position && totalSupply) {
          return position <= totalSupply
            ? {
                type: "success",
                message: (
                  <p>
                    The ordinal with the inscription id <b>{shortLootId}</b> was
                    inscribed at position{" "}
                    <b>
                      {inscribedPositions[lootId] as number}
                      {totalSupply && `/${totalSupply}`}
                    </b>
                    .
                  </p>
                ),
                code: lootDetail.inscriptionText,
              }
            : {
                type: "out-of-bounds",
                message: (
                  <p>
                    The ordinal with the inscription id <b>{shortLootId}</b> was
                    inscribed at position{" "}
                    <b>
                      {inscribedPositions[lootId] as number}
                      {totalSupply && `/${totalSupply}`}
                    </b>
                    .
                  </p>
                ),
                code: lootDetail.inscriptionText,
              };
        }
      } else {
        return {
          type: "bad-format",
          message: (
            <p>
              The ordinal with the inscription id <b>{shortLootId}</b> is not
              valid JSON5. Please check for missing or wrong quotes etc.
            </p>
          ),
          code: lootDetail.inscriptionText,
        };
      }
    }
  }, [lootId, lootDetails, inscribedPositions, shortLootId, getTotalSupply]);

  return (
    <main className="flex flex-col flex-grow py-8 space-y-8 container-3xl">
      <section>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-secondary-900 dark:text-secondary-100">
            Check Loot
          </h1>
          <p className="text-secondary-500 dark:text-secondary-500">
            Check the position of your loot among inscriptions with the same
            content.
          </p>
          <p className="text-xs text-secondary-500 dark:text-secondary-500">
            Example: You minted a power 10 loot for the Wizords game and you
            want to check if you were able to mint sub-100.
          </p>
        </div>
      </section>
      <section>
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-2">
            <input
              id="inscription-id"
              name="inscription-id"
              type="text"
              placeholder="Inscription Id"
              required={true}
              className="flex-grow rounded"
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              variant="primary"
              className="border-primary-500 h-[42px]"
            >
              Submit
            </Button>
          </div>
        </form>
      </section>
      {checkDetails && checkDetails.type && (
        <section>
          <div className={twMerge("flex flex-col items-center space-y-4")}>
            <div
              className={twMerge(
                "flex flex-row items-center p-6 space-x-2 bg-secondary-100 dark:bg-secondary-800 rounded-xl text-secondary-500",
                checkDetails.type === "out-of-bounds" && "text-red-500",
                checkDetails.type === "bad-format" && "text-red-500",
                checkDetails.type === "success" && " text-green-500 "
              )}
            >
              {checkDetails.type === "success" ? (
                <HiCheckCircle className="flex-shrink-0 w-8 h-8" />
              ) : (
                <HiXCircle className="flex-shrink-0 w-8 h-8" />
              )}
              {checkDetails.message}
            </div>
            {checkDetails.code && (
              <div className="w-full px-6 py-4 overflow-scroll rounded-xl bg-secondary-800">
                <div className="prose prose-invert prose-code:text-secondary-400">
                  <code className="">{checkDetails.code}</code>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default CheckPositionPage;
