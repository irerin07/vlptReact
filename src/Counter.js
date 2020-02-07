import React, { useReducer } from "react";

function reduce(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      throw new Error("Unhandled Action");
  }
}

function Counter() {
  const [number, dispatch] = useReducer(reduce, 0);
  const onIncrease = () => {
    //setNumber(prevNumber => prevNumber + 1); //함수형 업데이트. 최적화와 관련되어있다.
    dispatch({
      type: "INCREMENT"
    });
  };
  const onDecrease = () => {
    // setNumber(prevNumber => prevNumber - 1);
    dispatch({
      type: "DECREMENT"
    });
  };
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
