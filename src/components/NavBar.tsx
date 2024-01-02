import { NavLink } from "react-router-dom";

export type Props = {
  toggleMenu: () => void;
  menuOpen: boolean;
};

export default function NavBar({ toggleMenu, menuOpen }: Props) {
  const line = <div className="h-1 bg-white rounded-md w-6"></div>;
  const leaningLineTop = (
    <div className="h-1 bg-white rounded-md w-6 -rotate-12"></div>
  );
  const leaningLineBottom = (
    <div className="h-1 bg-white rounded-md w-6 rotate-12"></div>
  );
  return (
    <div className="flex items-center py-6 pl-4 text-lg bg-green-700 text-white font-mono w-full h-11">
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
        <NavLink to={"/"}>
          <div className="flex flex-row">
            <div className="rotate-3">För</div>
            <div className="-rotate-3">äldra</div>
            <div className="rotate-3">ledighets</div>
            <div className="-rotate-6">projektet</div>
            <div className="rotate-6 animate-bounce">👶</div>
          </div>
        </NavLink>
    </div>
  );
}
