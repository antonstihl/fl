import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import ParentProvider from "./context/ParentContext";
import Menu from "./components/Menu";
import NavBar from "./components/NavBar";
import ChildProvider from "./context/ChildContext";

const App = () => {
  return (
    <>
      <ParentProvider>
        <ChildProvider>
          <NavBar/>
          <main>
            <Outlet />
          </main>
        </ChildProvider>
      </ParentProvider>
    </>
  );
};

export default App;
