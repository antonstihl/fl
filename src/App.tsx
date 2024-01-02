import { useState } from "react";
import "./App.css";
import Menu from "./components/Menu";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
  };
  return (
    <>
      {menuOpen && <Menu closeMenu={() => setMenuOpen(false)} />}
      <NavBar toggleMenu={toggleMenu} menuOpen={menuOpen} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
