import React, { useReducer } from "react";

function reducer(state, action) {
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
  const [number, dispatch] = useReducer(reducer, 0); //(위에 생성한 reducer 함수, 사용하고자 하는 초기값)
  //number= 현재의 상태
  //dispatch= 액션을 발생시킨다.
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
