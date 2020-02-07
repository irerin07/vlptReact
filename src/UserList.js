import React, { useEffect } from "react";

const User = React.memo(function User({ user, onRemove, onToggle }) {
  const { username, email, id, active } = user;
  useEffect(() => {
    //UI가 나타난 이후에 실행된다.
    // console.log("component mount");
    // return () => {
    //   console.log("component unmount");
    // };
    console.log("set user value");
    console.log(user);
    return () => {
      console.log("before user value changes");
      console.log(user);
    };
  }, [user]);
  //user 값이 변할때마다 useEffect함수가 호출되고 바뀌기 직전에는 클리너 함수(return)가 호출된다.

  return (
    <div>
      <b
        style={{ color: active ? "green" : "black", cursor: "pointer" }}
        onClick={() => onToggle(id)}
      >
        {username}
      </b>
      &nbsp;
      <span>({email})</span>
      <button onClick={() => onRemove(id)}>delete</button>{" "}
      {/* id를 파라미터로넣어주기 위해 함수를 사용 */}
    </div>
  );
});
function UserList({ users, onRemove, onToggle }) {
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
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default React.memo(
  UserList,
  (prevProps, nextProps) => nextProps.users === prevProps.users
);
