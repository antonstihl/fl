import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  useParent,
  useParentUpdate,
  useParents,
} from "../context/ParentContext";

export default function NavBar() {
  const parent = useParent();
  const parents = useParents();
  const setParent = useParentUpdate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((menuOpen) => !menuOpen);
  };

  const closeMenuForNavigate = () => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getMenuItem = (text: string, path: string) => {
    return (
      <NavLink
        to={path}
        onClick={closeMenuForNavigate}
        className="rounded-md py-1 pl-2 pr-10 text-left w-full hover:bg-emerald-700"
      >
        {text}
      </NavLink>
    );
  };

  return (
    <>
      <div className="flex flex-col justify-start sticky top-0 z-20 left-2">
        <div className="flex justify-between items-center text-lg bg-green-700 text-white font-mono w-full min-w-fit h-12">
          <button
            className="flex flex-col space-y-1 py-3 px-4"
            onClick={() => toggleMenu()}
          >
            <span
              className={`h-1 bg-white rounded-md w-6 transition-all ${
                menuOpen && "-rotate-12"
              }`}
            />
            <span className="h-1 bg-white rounded-md w-6" />
            <span
              className={`h-1 bg-white rounded-md w-6 transition-all ${
                menuOpen && "rotate-12"
              }`}
            />
          </button>
          <NavLink to={"/"} onClick={closeMenuForNavigate}>
            <div className="flex flex-row gap-2">
              <p>Flappen</p>
              <div className="rotate-6">👶</div>
            </div>
          </NavLink>

          <select
            onChange={(e) => setParent(e.target.value)}
            className="rounded-md p-1 mr-4 w-max text-black"
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
      </div>
      <div
        className={`sticky top-12 flex flex-row w-full h-0 z-20 transition-all duration-200 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav
          className="left-0 bg-green-700 pt-2 px-2 h-screen text-white w-max flex flex-col z-20"
          {...{ inert: menuOpen ? undefined : "" }}
        >
          {getMenuItem("Familj", "/family")}
          {getMenuItem("Kalender", "/calendar")}
          {getMenuItem("Scheman", "/schedule")}
          {getMenuItem("Lön", "/salary")}
        </nav>
      </div>
      <div
        className={`fixed top-0 w-full h-full none z-10 transition-all duration-1000 ease-in-out ${
          menuOpen ? "block bg-black bg-opacity-50" : "hidden bg-transparent"
        }`}
        onClick={() => setMenuOpen(false)}
      />
    </>
  );
}
