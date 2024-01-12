import { NavLink } from "react-router-dom";

type Props = {
  closeMenu: () => void;
};

function Menu({ closeMenu }: Props) {
  const getMenuItem = (text: string, path: string) => {
    return (
      <NavLink
        to={path}
        onClick={() => closeMenu()}
        className="rounded-md py-2 pl-2 pr-10 text-left w-full hover:bg-emerald-700"
      >
        {text}
      </NavLink>
    );
  };
  return (
    <nav className="flex flex-row fixed h-full z-10">
      <div className="bg-green-700 pt-2 px-2 h-full text-white w-max flex flex-col">
        {getMenuItem("Familj", "/family")}
        {getMenuItem("Kalender", "/calendar")}
        {getMenuItem("Lön", "/salary")}
        {/* {getMenuItem("Statistik", "/stats")} */}
        {/* {getMenuItem("Hoppande kalkylator", "/calculator")} */}
        {/* {getMenuItem("Hjälp", "/help")} */}
      </div>
      <div
        className="flex-grow w-screen h-full bg-black bg-opacity-50 block"
        onClick={closeMenu}
      ></div>
    </nav>
  );
}

export default Menu;
