import { Link } from "react-router-dom";

type Props = {
  closeMenu: () => void;
}

function Menu(props: Props) {
  const getMenuItem = (text: string, path: string) => {
    return (
      <button className="rounded-md text-left px-2 w-full hover:bg-emerald-700 cursor-pointer">
        <Link to={path} onClick={() => props.closeMenu()}>{text}</Link>
      </button>
    );
  };
  return (
    // <div className="w-full h-full bg-black bg-opacity-50 block fixed top-11">
    <div className="flex flex-row fixed top-11 h-full">
      <div className="bg-emerald-500 pt-2 px-2 h-full text-white w-max flex-col space-y-2">
        {getMenuItem("Calendar", "/calendar")}
        {getMenuItem("Calculator", "/calculator")}
        {getMenuItem("Help", "/help")}
      </div>
      <div
        className="flex-grow h-full bg-black bg-opacity-50 block"
        onClick={props.closeMenu}
      ></div>
    </div>
  );
}

export default Menu;
