import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import ParentProvider from "./ParentContext";
import Menu from "./components/Menu";
import NavBar from "./components/NavBar";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
  };

  return (
    <>
      <ParentProvider>
        <NavBar toggleMenu={toggleMenu} menuOpen={menuOpen} />
        {menuOpen && <Menu closeMenu={() => setMenuOpen(false)} />}
        <main>
          <Outlet />
        </main>
      </ParentProvider>
    </>
  );
};

export default App;
