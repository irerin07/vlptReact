import React, { useRef, useCallback, useReducer, useMemo } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import useInputs from "./useInputs";

function countActiveUsers(users) {
  console.log("counting users");
  return users.filter(user => user.active).length;
}

const initialState = {
  // inputs: {
  //   username: "",
  //   email: ""
  // },
  users: [
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false
    }
  ]
};

function reducer(state, action) {
  switch (action.type) {
    // case "CHANGE_INPUT":
    //   return {
    //     ...state, //기존 상태를 저장하는 state
    //     inputs: {
    //       ...state.inputs,
    //       [action.name]: action.value //action.name이라는 이름으로 action.value값을 넘겨준다.
    //     }
    //   };
    case "CREATE_USER":
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      };
    case "TOGGLE_USER":
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.id ? { ...user, active: !user.active } : user
        )
      };
    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };
    default:
      throw new Error("Unhandled action");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);
  const { users } = state;
  // const { username, email } = state.inputs;
  const [form, onChange, reset] = useInputs({
    username: "",
    email: ""
  });
  const { username, email } = form;

  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
    reset();
  }, [username, email, reset]);

  // const onChange = useCallback(e => {
  //   const { name, value } = e.target;
  //   //name = 유저가 입력한 input태그의 이름
  //   //value = 유저가 입력한 값
  //   dispatch({
  //     type: "CHANGE_INPUT",
  //     name,
  //     value
  //   });
  // }, []);

  const onToggle = useCallback(id => {
    dispatch({
      type: "TOGGLE_USER",
      id
    });
  }, []);

  const onRemove = useCallback(id => {
    dispatch({
      type: "REMOVE_USER",
      id
    });
  }, []);

  const onCount = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>active users: {onCount}</div>
    </>

    // const [inputs, setInputs] = useState({
    //   username: "",
    //   email: ""
    // });
    // const { username, email } = inputs;
    // const onChange = useCallback(
    //   e => {
    //     const { name, value } = e.target;
    //     setInputs({
    //       ...inputs,
    //       [name]: value
    //     });
    //   },
    //   [inputs]
    // );
    // const [users, setUsers] = useState([
    //   {
    //     id: 1,
    //     username: "a",
    //     email: "a@a",
    //     active: true
    //   },
    //   {
    //     id: 2,
    //     username: "b",
    //     email: "b@b",
    //     active: false
    //   },
    //   {
    //     id: 3,
    //     username: "c",
    //     email: "c@c",
    //     active: true
    //   }
    // ]);

    // const nextId = useRef(4);

    // const onCreate = useCallback(() => {
    //   const user = {
    //     id: nextId.current,
    //     username,
    //     email
    //   };
    //   // setUsers([...users, user]); //기존 users배열에 user를 추가한다.
    //   setUsers(users => users.concat(user));
    //   setInputs({
    //     username: "",
    //     email: ""
    //   });
    //   nextId.current += 1;
    // }, [username, email]);

    // const onRemove = useCallback(id => {
    //   setUsers(users => users.filter(user => user.id !== id));
    // }, []);

    // const onToggle = useCallback(id => {
    //   setUsers(users =>
    //     users.map(user =>
    //       user.id === id ? { ...user, active: !user.active } : user
    //     )
    //   );
    // }, []);

    // const count = useMemo(() => countActiveUsers(users), [users]);
    // //[users]의 값이 바뀌어야만 새로 연산을 한다.
    // return (
    //   // <Wrapper>
    //   //   <Hello name="react" color="red" isSpecial={true} />
    //   //   <Hello />
    //   //   {/* Wrapper태그 사이에 들어있는 것이 children이 된다. */}
    //   // </Wrapper>
    //   // <Counter />
    //   // <InputSample />
    //   <>
    //     <CreateUser
    //     // username={username}
    //     // email={email}
    //     // onChange={onChange}
    //     // onCreate={onCreate}
    //     />
    //     {/* <UserList users={[users]} onRemove={onRemove} onToggle={onToggle} /> */}
    //     <UserList users={[]} />
    //     <div>active user: 0</div>
    // </>
  );
}

export default App;
