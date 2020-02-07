import React, { useRef, useState, useMemo, useCallback } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

function countActiveUsers(users) {
  console.log("counting users");
  return users.filter(user => user.active).length;
}
function App() {
  const [inputs, setInputs] = useState({
    username: "",
    email: ""
  });
  const { username, email } = inputs;
  const onChange = useCallback(
    e => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value
      });
    },
    [inputs]
  );
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "a",
      email: "a@a",
      active: true
    },
    {
      id: 2,
      username: "b",
      email: "b@b",
      active: false
    },
    {
      id: 3,
      username: "c",
      email: "c@c",
      active: true
    }
  ]);

  const nextId = useRef(4);

  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    // setUsers([...users, user]); //기존 users배열에 user를 추가한다.
    setUsers(users => users.concat(user));
    setInputs({
      username: "",
      email: ""
    });
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback(id => {
    setUsers(users => users.filter(user => user.id !== id));
  }, []);

  const onToggle = useCallback(id => {
    setUsers(users =>
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);
  //[users]의 값이 바뀌어야만 새로 연산을 한다.
  return (
    // <Wrapper>
    //   <Hello name="react" color="red" isSpecial={true} />
    //   <Hello />
    //   {/* Wrapper태그 사이에 들어있는 것이 children이 된다. */}
    // </Wrapper>
    // <Counter />
    // <InputSample />
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>active user: {count}</div>
    </>
  );
}

export default App;
