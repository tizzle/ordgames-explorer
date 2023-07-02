import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/foundation/layout.tsx";
import AboutPage from "./routes/about.tsx";
import ErrorPage from "./routes/error.tsx";
import GameDetailPage from "./routes/game-detail.tsx";
import HomePage from "./routes/home.tsx";
import { emitPromise } from "./socket/index.ts";
import "./styles/index.css";

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
        loader: async ({ params }) => {
          if (params.gameId) {
            // fetch data
            const data = await emitPromise({
              func: "gameStats",
              args: [params.gameId],
              call_id: "",
            });

            // return data
            if (data.error === "") {
              return data;
            }
          }
          return null;
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
