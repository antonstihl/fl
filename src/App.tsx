import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import ParentProvider from "./utils/ParentContext";
import Menu from "./components/Menu";
import NavBar from "./components/NavBar";
import ChildProvider from "./utils/ChildContext";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
  };

  return (
    <>
      <ParentProvider>
        <ChildProvider>
          <NavBar toggleMenu={toggleMenu} menuOpen={menuOpen} />
          {menuOpen && <Menu closeMenu={() => setMenuOpen(false)} />}
          <main>
            <Outlet />
          </main>
        </ChildProvider>
      </ParentProvider>
    </>
  );
};

export default App;
