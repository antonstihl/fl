import { Link } from "react-router-dom";

type Props = {
  closeMenu: () => void;
}

function Menu({closeMenu}: Props) {
  const getMenuItem = (text: string, path: string) => {
    return (
      <button className="rounded-md text-left px-2 py-2 w-full hover:bg-emerald-700 cursor-pointer">
        <Link to={path} onClick={() => closeMenu()}>{text}</Link>
      </button>
    );
  };
  return (
    <div className="flex flex-row fixed top-11 h-full">
      <div className="bg-emerald-500 pt-2 px-2 h-full text-white w-max flex-col space-y-2">
        {getMenuItem("Calendar", "/calendar")}
        {getMenuItem("Calculator", "/calculator")}
        {getMenuItem("Help", "/help")}
      </div>
      <div
        className="flex-grow w-screen h-full bg-black bg-opacity-50 block"
        onClick={closeMenu}
      ></div>
    </div>
  );
}

export default Menu;
