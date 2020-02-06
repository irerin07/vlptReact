import React, { useState, useRef } from "react";

function InputSample() {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: ""
  });
  const nameInput = useRef();
  const { name, nickname } = inputs;
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
      //불변성을 지켜주어야 한다.
    });
  };
  const onReset = () => {
    setInputs({
      name: "",
      nickname: ""
    });
    nameInput.current.focus();
  };
  return (
    <div>
      <input
        name="name"
        placeholder="name"
        onChange={onChange}
        value={name}
        ref={nameInput}
      />
      <input
        name="nickname"
        placeholder="nickname"
        onChange={onChange}
        value={nickname}
      />
      <button onClick={onReset}>reset</button>
      <div>
        <b>value: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;
