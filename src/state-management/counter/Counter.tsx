import React from "react";
import useCounterStore from "./store";

const Counter = () => {
  const { counter, reset, increment } = useCounterStore();

  return (
    <div>
      <span>Counter ({counter})</span>

      <button onClick={increment} className="btn btn-primary mx-1">
        Increment
      </button>

      <button onClick={reset} className="btn btn-primary mx-1">
        Reset
      </button>
    </div>
  );
};

export default Counter;
