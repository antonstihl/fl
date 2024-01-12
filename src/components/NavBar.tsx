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
  const [isHoveringTitle, setIsHoveringTitle] = useState(false);

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

  const getMenuItem = (text: string, path: string) => {
    return (
      <NavLink
        to={path}
        onClick={() => setMenuOpen(false)}
        className="rounded-md py-1 pl-2 pr-10 text-left w-full hover:bg-emerald-700"
      >
        {text}
      </NavLink>
    );
  };

  return (
    <>
      <div className="flex flex-col justify-start sticky top-0 z-20">
        <div className="flex justify-between items-center text-lg bg-green-700 text-white font-mono w-screen min-w-fit h-12">
          <button onClick={() => toggleMenu()}>
            <div className="flex flex-col space-y-1 py-3 px-4">
              {!menuOpen && line}
              {!menuOpen && line}
              {!menuOpen && line}
              {menuOpen && leaningLineTop}
              {menuOpen && line}
              {menuOpen && leaningLineBottom}
            </div>
          </button>
          <NavLink to={"/"} onClick={menuOpen ? toggleMenu : () => {}}>
            <div
              className="flex flex-row gap-2"
              onMouseEnter={() => setIsHoveringTitle(true)}
              onMouseLeave={() => setIsHoveringTitle(false)}
            >
              <p>
                F
                <span className={`${!isHoveringTitle && "hidden"}`}>
                  öräldra
                </span>
                l
                <span className={`${!isHoveringTitle && "hidden"}`}>
                  edighets
                </span>
                appen
              </p>
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
      {menuOpen && (
        <div className="sticky top-12 flex flex-row w-screen h-0 z-20">
          <nav className="left-0 bg-green-700 pt-2 px-2 h-screen text-white w-max flex flex-col z-20">
            {getMenuItem("Familj", "/family")}
            {getMenuItem("Kalender", "/calendar")}
            {getMenuItem("Lön", "/salary")}
          </nav>
        </div>
      )}
      {menuOpen && (
        <div
          className="fixed top-0 w-screen h-screen bg-black bg-opacity-50 block z-10"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
