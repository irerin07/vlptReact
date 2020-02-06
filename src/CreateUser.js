import React from "react";

function CreateUser({ username, email, onChange, onCreate }) {
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

export default CreateUser;
