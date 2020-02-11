import React, { useContext, useRef } from "react";
import { UserDispatch } from "./App";
import useInputs from "./useInputs";

function CreateUser() {
  
  const [{ username, email }, onChange, reset] = useInputs({
    username: "",
    email: ""
  });
  const dispatch = useContext(UserDispatch);
  const nextId = useRef(4);

  const onCreate = () => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    reset();
    nextId.current += 1;
  };

  return (
    <div>
      <input
        name="username"
        placeholder="user name"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="email"
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>create account</button>
    </div>
  );
}

export default React.memo(CreateUser);
