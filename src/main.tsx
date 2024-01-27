import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, redirect, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import CalendarPage from "./pages/CalendarPage.tsx";
import FamilyPage from "./pages/FamilyPage.tsx";
import SalaryPage from "./pages/SalaryPage.tsx";
import SchedulePage from "./pages/SchedulePage.tsx";

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
        path: "salary",
        element: <SalaryPage />,
      },
      {
        path: "calendar",
        element: <CalendarPage />,
      },
      {
        path: "schedule",
        element: <SchedulePage />,
      },
      // {
      //   path: "stats",
      //   element: <StatsPage />,
      // },
      // {
      //   path: "calculator",
      //   element: <Calculator />,
      // },
      // {
      //   path: "help",
      //   element: <Help />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
