import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from "./InfoBar";
import Input from "./Input";
import Messages from "./Messages";
import { Redirect } from "react-router-dom";
import TextContainer from "./TextContainer";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "";
  // const ENDPOINT = "https://reat-chatting-app.herokuapp.com/";
  // const ENDPOINT = "localhost:5000";
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
        setError(true);
      }
    });
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, location.search]);
  useEffect(() => {
    socket.on("message", (message) => setMessages([...messages, message]));
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);
  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div>
      {error ? (
        <Redirect to={`/`}></Redirect>
      ) : (
        <div className="outerContainer">
          <div className="innerContainer">
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
          </div>
          <TextContainer users={users} />
        </div>
      )}
    </div>
  );
};
export default Chat;
