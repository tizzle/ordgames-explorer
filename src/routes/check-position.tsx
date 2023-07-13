import React from "react";
import { twMerge } from "tailwind-merge";
import Button from "../components/atoms/button";
import { emitPromise } from "../socket";
import { Ordinal } from "../types/ordinals";
import { isValidJSON5 } from "../utils/json";

export type CheckResult = {
  type: "success" | "badFormat";
  message: string | React.ReactNode;
  code?: string;
};

const CheckPositionPage = () => {
  const [fieldValues, setFieldValues] = React.useState<{
    [key: string]: unknown;
  }>({});

  const [checkResult, setCheckResult] = React.useState<CheckResult>();

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

      setCheckResult(undefined);

      const inscriptionId = fieldValues["inscription-id"] as string;

      const ordinalResponse = await emitPromise({
        func: "ordinal",
        args: [inscriptionId],
        call_id: "",
      });

      const ordinal = ordinalResponse.result as Ordinal;
      const ordinalContent = atob(ordinal.content);
      const shortId = `${inscriptionId.slice(0, 8)}...${inscriptionId.slice(
        -8
      )}`;

      if (isValidJSON5(ordinalContent)) {
        // is a valid json5, fetch the position

        const data = await emitPromise({
          func: "inscribedPosition",
          args: [inscriptionId],
          call_id: "",
        });

        setCheckResult({
          type: "success",
          message: (
            <p>
              The ordinal with the inscription id <b>{shortId}</b> was inscribed
              at position <b>{data.result as number}</b>.
            </p>
          ),
          code: ordinalContent,
        });
      } else {
        // is not a valid json5, break and show hint
        setCheckResult({
          type: "badFormat",
          message: (
            <p>
              The ordinal with the inscription id <b>{shortId}</b> is not valid
              JSON5. Please check for missing or wrong quotes etc.
            </p>
          ),
          code: ordinalContent,
        });
      }
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
      {checkResult && (
        <section>
          <div className={twMerge("flex flex-col items-center space-y-4")}>
            <div
              className={twMerge(
                "p-6 rounded-xl text-secondary-900 dark:text-secondary-100 w-full",
                checkResult.type === "success" &&
                  "bg-secondary-100 dark:bg-secondary-800",
                checkResult.type !== "success" && "bg-red-100 dark:bg-red-500"
              )}
            >
              {checkResult.message}
            </div>
            {checkResult.code && (
              <div className="w-full px-6 py-4 rounded-xl bg-secondary-800">
                <div className="prose prose-invert prose-code:text-secondary-400">
                  <code>{checkResult.code}</code>
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
