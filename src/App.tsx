import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu";
import NavBar from "./components/NavBar";

export const PARENTS: Parent[] = [
  {
    id: "1",
    name: "Simon",
    color: "red",
  },
  {
    id: "2",
    name: "Anna",
    color: "green",
  },
];

const dummyParent: Parent = {
  id: "-1",
  name: "John",
  color: "blue",
};

export const ParentContext = createContext<Parent>(dummyParent);

export const ParentUpdateContext = createContext((id: string) =>
  alert("No handler in place")
);

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [parentId, setParentId] = useState<string>(PARENTS[0].id);

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
  };

  let parent = PARENTS.find((p) => p.id === parentId);
  if (!parent) {
    parent = dummyParent;
  }

  return (
    <>
      <ParentContext.Provider value={parent}>
        <ParentUpdateContext.Provider value={(id: string) => setParentId(id)}>
          <NavBar toggleMenu={toggleMenu} menuOpen={menuOpen} />
          {menuOpen && <Menu closeMenu={() => setMenuOpen(false)} />}
          <main>
            <Outlet />
          </main>
        </ParentUpdateContext.Provider>
      </ParentContext.Provider>
    </>
  );
};

export default App;
