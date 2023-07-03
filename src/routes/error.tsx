import { useRouteError } from "react-router-dom";

export type RouterError = {
  statusText?: string;
  message?: string;
};

export default function ErrorPage() {
  const error = useRouteError() as RouterError;
  console.error(error);

  return (
    <main className="flex flex-col items-center justify-center flex-grow container-7xl">
      <section className="flex flex-col items-center justify-center space-y-8">
        <h1 className="text-3xl font-bold text-secondary-900">Oops!</h1>
        <p className="text-secondary-900">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-secondary-500">
          <i>{error.statusText || error.message}</i>
        </p>
      </section>
    </main>
  );
}
