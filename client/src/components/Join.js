import React, { useState } from "react";
import { Link } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1>Join</h1>
        <input
          className="joinInput"
          placeholder="Name"
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <input
          className="joinInput "
          placeholder="Room"
          tupe="text"
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        ></input>
        <Link onClick={(e) => (!name || !room ? e.preventDefault : null)} to={`/chat?name=${name}&room=${room}`}>
          <button className="button" type="submit">
            SIGN IN
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
