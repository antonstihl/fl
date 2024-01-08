import { NavLink } from "react-router-dom";
import {
  useParent,
  useParentUpdate,
  useParents,
} from "../context/ParentContext";
import { useState } from "react";
import Menu from "./Menu";

export default function NavBar() {
  const parent = useParent();
  const parents = useParents();
  const setParent = useParentUpdate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((menuOpen) => !menuOpen);
  };

  const line = <div className="h-1 bg-white rounded-md w-6"></div>;
  const leaningLineTop = (
    <div className="h-1 bg-white rounded-md w-6 -rotate-12"></div>
  );
  const leaningLineBottom = (
    <div className="h-1 bg-white rounded-md w-6 rotate-12"></div>
  );
  return (
    <>
      <div className="flex justify-between items-center px-4 text-lg bg-green-700 text-white font-mono w-full h-12">
        <button onClick={() => toggleMenu()}>
          <div className="flex flex-col space-y-1 pr-4">
            {!menuOpen && line}
            {!menuOpen && line}
            {!menuOpen && line}
            {menuOpen && leaningLineTop}
            {menuOpen && line}
            {menuOpen && leaningLineBottom}
          </div>
        </button>
        <NavLink to={"/"} onClick={menuOpen ? toggleMenu : () => {}}>
          <div className="flex flex-row">
            <div className="rotate-3">För</div>
            <div className="-rotate-3">äldra</div>
            <div className="rotate-3">ledighets</div>
            <div className="-rotate-6">projektet</div>
            <div className="rotate-6 animate-pulse">👶</div>
          </div>
        </NavLink>

        <select
          onChange={(e) => setParent(e.target.value)}
          className="rounded-md p-1 w-max text-black"
          name="parent"
          value={parent?.id}
        >
          {parents.map((p) => (
            <option value={p.id} key={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      {menuOpen && <Menu closeMenu={() => setMenuOpen(false)} />}
    </>
  );
}
