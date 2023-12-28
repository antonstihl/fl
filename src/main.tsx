import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Calculator from "./components/Calculator.tsx";
import Help from "./components/Help.tsx";
import CalendarPage from "./pages/CalendarPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "calendar",
        element: <CalendarPage />,
      },
      {
        path: "calculator",
        element: <Calculator />,
      },
      {
        path: "help",
        element: <Help />,
      },
    ],
  },
  // {
  //   path: "/calculator",
  //   element: <Calculator/>
  // }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
