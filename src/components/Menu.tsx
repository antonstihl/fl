import { NavLink } from "react-router-dom";

type Props = {
  closeMenu: () => void;
};

function Menu({ closeMenu }: Props) {
  const getMenuItem = (text: string, path: string) => {
    return (
      <div className="flex flex-row">
        <NavLink
          to={path}
          onClick={() => closeMenu()}
          className="rounded-md py-1 px-2 text-left w-full hover:bg-emerald-700"
        >
          {text}
        </NavLink>
      </div>
    );
  };
  return (
    <nav className="flex flex-row fixed top-11 h-full">
      <div className="bg-green-700 pt-2 px-2 h-full text-white w-max flex-col space-y-2">
        {getMenuItem("Profil", "/profile")}
        {getMenuItem("Kalender", "/calendar")}
        {getMenuItem("Hoppande kalkylator", "/calculator")}
        {getMenuItem("Hjälp", "/help")}
      </div>
      <div
        className="flex-grow w-screen h-full bg-black bg-opacity-50 block"
        onClick={closeMenu}
      ></div>
    </nav>
  );
}

export default Menu;
