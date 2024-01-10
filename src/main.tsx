import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, redirect, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import Help from "./components/Help.tsx";
import CalendarPage from "./pages/CalendarPage.tsx";
import FamilyPage from "./pages/FamilyPage.tsx";
import StatsPage from "./pages/StatsPage.tsx";

const landingLoader = async () => {
  return redirect("calendar");
};

const router = createHashRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "",
        loader: landingLoader,
      },
      {
        path: "family",
        element: <FamilyPage />,
      },
      {
        path: "calendar",
        element: <CalendarPage />,
      },
      {
        path: "stats",
        element: <StatsPage />,
      },
      // {
      //   path: "calculator",
      //   element: <Calculator />,
      // },
      {
        path: "help",
        element: <Help />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
