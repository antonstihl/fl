import { FormEvent, useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState<number | undefined>(0);

  useEffect(() => {
    setCount(Number(localStorage.getItem("count")) ?? 0);
  }, []);

  const addInputToCount = (e: any) => {
    if (input === undefined) {
      return;
    }
    const newCount = count + input;
    localStorage.setItem("count", newCount.toString());
    setCount(newCount);
    setInput(0);
  };

  const updateInput = (e: any) => {
    setInput(Number(e.target.value));
  };

  return (
    <>
      <h1>FL</h1>
      <form>
        <label>
          +
          <input
            style={{ marginLeft: 4, marginRight: 4, marginBottom: 12 }}
            type='number'
            value={input}
            onChange={updateInput}
          ></input>
        </label>
        <input
          type="button"
          onClick={addInputToCount}
          value="Add to count"
        ></input>
      </form>
      <div>Sum: {count}</div>
    </>
  );
}

export default App;
