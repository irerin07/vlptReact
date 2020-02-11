import React, { createContext, useContext, useState } from "react";

const MyContext = createContext("defaultValue");

function Child() {
  const text = useContext(MyContext);
  return <div>hello {text}</div>;
}
function Parent() {
  return <Child />;
}
function Ancestor() {
  return <Parent />;
}
function ContextSample() {
  const [value, setValue] = useState(true);
  return (
    <MyContext.Provider value={value ? "good" : "bad"}>
      <Ancestor />
      <button onClick={() => setValue(!value)}>click</button>
    </MyContext.Provider>
  );
}
export default ContextSample;
