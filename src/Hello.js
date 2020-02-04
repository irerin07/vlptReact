import React from "react";

function Hello({ color, name, isSpecial }) {
  //   const { color, name } = props;
  return (
    <div style={{ color }}>
      {/* {isSpecial ? <b>*</b> : null}Hello {name} */}
      {isSpecial && <b>*</b>}Hello {name}
    </div>
  );
}

Hello.defaultProps = {
  name: "noname",
  color: "aqua"
};
export default Hello;
