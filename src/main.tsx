import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import Calculator from "./components/Calculator.tsx";
import Calendar from "./components/Calendar.tsx";
import Help from "./components/Help.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "calendar",
        element: <Calendar />,
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
    <RouterProvider router={router}/>
  </React.StrictMode>
);
