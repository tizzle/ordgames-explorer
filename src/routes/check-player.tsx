import React from "react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
import Button from "../components/atoms/button";
import { emitPromise } from "../socket";

export type PlayerData = {
  inscriptionNumber: string;
  isValid: boolean;
};

const CheckPlayerPage = () => {
  const [fieldValues, setFieldValues] = React.useState<{
    [key: string]: unknown;
  }>({});

  const [playerData, setPlayerData] = React.useState<PlayerData>();

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
            event.target.setCustomValidity(
              "Please enter an inscription number."
            );
            break;
        }
      } else {
        event.target.setCustomValidity("");
      }
    },
    []
  );

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      const data = await emitPromise({
        func: "isValidPlayer",
        args: [fieldValues["inscription-id"] as string],
        call_id: "",
      });

      setPlayerData({
        inscriptionNumber: fieldValues["inscription-id"] as string,
        isValid: data.result as boolean,
      });
    },
    [fieldValues]
  );

  return (
    <main className="flex flex-col flex-grow py-8 space-y-8 container-3xl">
      <section>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-secondary-900 dark:text-secondary-100">
            Check Player
          </h1>
          <p className="text-secondary-500 dark:text-secondary-500">
            Check if a player is valid by searching for it with it's inscription
            id.
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
              className="rounded"
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
      {playerData && (
        <section>
          <div
            className={twMerge(
              "flex flex-row items-center p-6 space-x-2 bg-secondary-100 dark:bg-secondary-800 rounded-xl",
              playerData.isValid && "text-green-500",
              !playerData.isValid && "text-red-500"
            )}
          >
            {playerData.isValid ? (
              <HiCheckCircle className="w-8 h-8" />
            ) : (
              <HiXCircle className="w-8 h-8" />
            )}
            <p>
              {"The player with the inscription id "}
              <b>{playerData.inscriptionNumber}</b>
              {" is "}
              {playerData.isValid ? "a valid player." : "not a valid player."}
            </p>
          </div>
        </section>
      )}
    </main>
  );
};

export default CheckPlayerPage;

/*
import { io } from 'socket.io-client';

const trac = io('https://ordgames.trac.network', {
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionDelayMax: 500,
  randomizationFactor: 0,
});


// Error logging:

trac.on('error', (error) => {
  console.log(error);
});

// Handle requests (atm 2 that are ordgames relevant, getGameStats() and getIsValidPlayer()):
// the "call_id" you can choose yourself to determine for what request the response has been.
// for example if you want to render something but you wait for the response, you can set any kind of ID you wish and once it's included in a response, render the demanded parts

trac.emit('get',
                    {
                        func : 'gameStats',
                        args : [$INSCRIPTION-ID],
                        call_id : ''
                    });

trac.emit('get',
                    {
                        func : 'isValidPlayer',
                        args : [$INSCRIPTION-ID],
                        call_id : ''
                    });

// Handle responses:

trac.on('response', (response) => {
  // you'd probably replace this with a switch statement
  if (response.func === '$NAME-OF-FUNCTION-YOU-ORIGINALLY-REQUESTED') {
    console.log(response.result);
  }
}); 
*/
