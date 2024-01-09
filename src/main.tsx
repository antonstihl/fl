import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Calculator from "./components/Calculator.tsx";
import Help from "./components/Help.tsx";
import CalendarPage from "./pages/CalendarPage.tsx";
import FamilyPage from "./pages/FamilyPage.tsx";
import StatsPage from "./pages/StatsPage.tsx";
import SalaryPage from "./pages/SalaryPage.tsx";

const landingLoader = async () => {
  return redirect("/calendar");
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
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
