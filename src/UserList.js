import React, { useContext } from "react";
import { UserDispatch } from "./App";

const User = React.memo(function User({ user }) {
  const dispatch = useContext(UserDispatch);
  // useEffect(() => {
  //   //UI가 나타난 이후에 실행된다.
  //   // console.log("component mount");
  //   // return () => {
  //   //   console.log("component unmount");
  //   // };
  //   console.log("set user value");
  //   console.log(user);
  //   return () => {
  //     console.log("before user value changes");
  //     console.log(user);
  //   };
  // }, [user]);
  //user 값이 변할때마다 useEffect함수가 호출되고 바뀌기 직전에는 클리너 함수(return)가 호출된다.

  return (
    <div>
      <b
        style={{ color: user.active ? "green" : "black", cursor: "pointer" }}
        onClick={() =>
          dispatch({
            type: "TOGGLE_USER",
            id: user.id
          })
        }
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button
        onClick={() =>
          dispatch({
            type: "REMOVE_USER",
            id: user.id
          })
        }
      >
        delete
      </button>{" "}
      {/* id를 파라미터로넣어주기 위해 함수를 사용 */}
    </div>
  );
});
function UserList({ users }) {
  return (
    <div>
      {/* <div>
        <b>{users[0].username}</b>
        <span>({users[0].email})</span>
      </div>
      <div>
        <b>{users[1].username}</b>
        <span>({users[1].email})</span>
      </div>
      <div>
        <b>{users[2].username}</b>
        <span>({users[2].email})</span>
      </div> */}

      {/* <User user = {users[0]}/>
      <User user = {users[1]}/>
      <User user = {users[2]}/> */}

      {users.map(user => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}

export default React.memo(UserList);
