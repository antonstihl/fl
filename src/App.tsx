import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setCount(Number(localStorage.getItem("count")) ?? 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("count", count.toString());
  }, [count])

  const updateCount = (op: (n: number) => number) => () => {
    if (input === undefined) {
      return;
    }
    const newCount = op(count);
    setCount(newCount);
    // setInput(1);
  };

  const updateInput = (e: any) => {
    setInput(Number(e.target.value));
  };

  const pressNumberButton = (n: number) => () => {
    setInput(Number(input.toString() + n.toString()));
  };

  const pressDeleteButton = () => {
    setInput(Number(input.toString().slice(0, -1)));
  };
  
  const pressClearButton = () => {
    setInput(0);
    setCount(0);
  };

  const getButtonCell = (n: number | "delete" | "clear") => {
    if (n === "delete") {
      return (
        <div className="border-2 border-black  text-center hover:bg-green-500">
          <button className="w-full" onClick={pressDeleteButton}>
            {n}
          </button>
        </div>
      );
    }
    if (n === "clear") {
      return (
        <div className="border-2 border-black  text-center hover:bg-green-500">
        <button className="w-full" onClick={pressClearButton}>
          {n}
        </button>
      </div>
      )
    }
      return (
        <div className="border-2 border-black  text-center hover:bg-green-500">
          <button className="w-full" onClick={pressNumberButton(n)}>
            {n}
          </button>
        </div>
      );
  };

  const line = <div className="h-0 border-white border-2 rounded-md w-6"></div>;
  const arrowLeftUpper = (
    <div className="h-0 border-white border-2 rounded-md w-6 -rotate-45"></div>
  );
  const arrowLeftLower = (
    <div className="h-0 border-white border-2 rounded-md w-6 rotate-45"></div>
  );
  return (
    <>
      <div className="flex w-full flex-row">
        {menuOpen && (
          <div className="bg-emerald-500 h-full text-white w-max">
            <ol>
              <li>Menu item 1</li>
              <li>Menu item 2</li>
              <li>Menu item 3</li>
            </ol>
          </div>
        )}
        <div>
          <div className="py-2 pl-4 text-lg bg-emerald-500 shadow-emerald-500 shadow-md text-white font-mono w-screen">
            <div className="flex flex-row">
              <button onClick={() => setMenuOpen((m) => !m)}>
                <div className="flex flex-col space-y-1 pr-4">
                  {!menuOpen && line}
                  {!menuOpen && line}
                  {!menuOpen && line}
                  {menuOpen && arrowLeftUpper}
                  {menuOpen && arrowLeftLower}
                </div>
              </button>
              <div className="rotate-3">För</div>
              <div className="-rotate-3">äldra</div>
              <div className="rotate-3">ledighets</div>
              <div className="-rotate-6">projektet</div>
              <div className="rotate-6">👶</div>
            </div>
          </div>
          <div className="border-black ml-4 mt-4 p-2 rounded-md border-2 shadow-md shadow-emerald-500 flex w-max flex-col items-center">
            <div className="justify-center">{count}</div>
            <form>
              <input
                className="border-2 rounded-md border-black pl-2"
                type="number"
                value={input}
                onChange={updateInput}
              ></input>
            </form>
            <div className="mt-2 grid grid-rows-4 grid-cols-3 w-full gap-1">
              {[1, 2, 3].map((n) => getButtonCell(n))}
              {[4, 5, 6].map((n) => getButtonCell(n))}
              {[7, 8, 9].map((n) => getButtonCell(n))}
              {["delete", 0, "clear"].map((n) => getButtonCell(n))}
            </div>
            {/* <table className="flex my-1">
          <tr>{[1, 2, 3].map((n) => getButtonCell(n))}</tr>
          <tr>{[1, 2, 3].map((n) => getButtonCell(n))}</tr>
          <tr>{[1, 2, 3].map((n) => getButtonCell(n))}</tr>
        </table> */}
            <div className="space-x-2">
              <button
                className="rounded-full hover:bg-green-500 bg-green-200 border-2 border-black my-2 w-8 h-8"
                onClick={updateCount((x) => x + input)}
              >
                +
              </button>
              <button
                className="hover:bg-green-500 bg-green-200 border-2 border-black my-2 w-8 h-8 rounded-full"
                onClick={updateCount((x) => x - input)}
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
