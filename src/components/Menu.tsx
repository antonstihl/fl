function Menu() {
  const getButton = (text: string) => {
    return (
      <button className="text-left px-2 w-full hover:bg-emerald-700 cursor-pointer">
        {text}
      </button>
    );
  };
  return (
    <div className="w-full h-full bg-black bg-opacity-50 block fixed top-11">
      <div className="bg-emerald-500 pt-2 px-2 h-full text-white w-max flex flex-col space-y-2">
        {getButton("Calculator")}
        {getButton("Calendar")}
        {getButton("Help")}
      </div>
    </div>
  );
}

export default Menu;
