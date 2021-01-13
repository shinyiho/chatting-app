import React from "react";

import onlineIcon from "../icons/onlineIcon.png";

const TextContainer = ({ users }) => (
  <div className="textContainer">
    {users ? (
      <div>
        <h1>People online: ❤️ </h1>
        <div className="activeContainer">
          <h2>
            {console.log(users, "onlinestatus")}
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                {name}
                <img alt="Online Icon" src={onlineIcon} />
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
