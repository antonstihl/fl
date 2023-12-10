import { useEffect, useState } from "react";

function Calculator() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState<number>(0);

  useEffect(() => {
    setCount(Number(localStorage.getItem("count")) ?? 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("count", count.toString());
  }, [count]);

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
    let button = <></>;

    if (n === "delete") {
      button = (
        <button key={n} className="w-full" onClick={pressDeleteButton}>
          {n}
        </button>
      );
    } else if (n === "clear") {
      button = (
        <button className="w-full" onClick={pressClearButton}>
          {n}
        </button>
      );
    } else {
      button = (
        <button className="w-full" onClick={pressNumberButton(n)}>
          {n}
        </button>
      );
    }

    return (
      <div
        key={n}
        className="border-2 border-black  text-center hover:bg-green-500"
      >
        {button}
      </div>
    );
  };

  const getOperationButton = (text: string, op: (n: number) => number) => {
    return (
      <button
        key={text}
        className="rounded-full hover:bg-green-500 bg-green-200 border-2 border-black my-2 w-8 h-8"
        onClick={updateCount((x) => op(x))}
      >
        {text}
      </button>
    );
  };

  return (
    <div className="border-black ml-4 mt-4 p-2 rounded-md border-2 flex w-max flex-col items-center">
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
        {(["delete", 0, "clear"] as const).map((n) => getButtonCell(n))}
      </div>
      <div className="space-x-2">
        {getOperationButton("Add", (x) => x + input)}
        {getOperationButton("Sub", (x) => x - input)}
        {getOperationButton("Mul", (x) => x * input)}
        {getOperationButton("Div", (x) => x / input)}
      </div>
    </div>
  );
}

export default Calculator;
