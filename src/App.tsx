import { useEffect, useState } from "react";
import "./App.css";
import Menu from "./components/Menu";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
  };
  return (
    <>
      {menuOpen && <Menu closeMenu={() => setMenuOpen(false)} />}
      <Header toggleMenu={toggleMenu} menuOpen={menuOpen} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
