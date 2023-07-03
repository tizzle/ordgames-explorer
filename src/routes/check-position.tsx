import React from "react";
import Button from "../components/atoms/button";
import { emitPromise } from "../socket";

export type PlayerData = {
  inscriptionNumber: string;
  position: number;
};

const CheckPositionPage = () => {
  const [fieldValues, setFieldValues] = React.useState<{
    [key: string]: unknown;
  }>({});

  const [positionData, setPositionData] = React.useState<PlayerData>();

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

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      const data = await emitPromise({
        func: "inscribedPosition",
        args: [fieldValues["inscription-id"] as string],
        call_id: "",
      });

      setPositionData({
        inscriptionNumber: fieldValues["inscription-id"] as string,
        position: data.result as number,
      });
    },
    [fieldValues]
  );

  return (
    <main className="flex flex-col flex-grow py-8 space-y-8 container-3xl">
      <section>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-secondary-900 dark:text-secondary-100">
            Check Position
          </h1>
          <p className="text-secondary-500 dark:text-secondary-500">
            Check the position of an ordinal inscription among inscriptions with
            the same content.
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
      {positionData && (
        <section>
          <div className="flex flex-row items-center p-6 space-x-2 bg-secondary-100 dark:bg-secondary-800 rounded-xl text-secondary-900 dark:text-secondary-100">
            <p className="text-ellipsis">
              {"The ordinal with inscription id "}
              <b>
                {positionData.inscriptionNumber.slice(0, 8)}...
                {positionData.inscriptionNumber.slice(-8)}
              </b>
              {" was inscribed at position "}
              <b>{positionData.position}</b>.
            </p>
          </div>
        </section>
      )}
    </main>
  );
};

export default CheckPositionPage;
