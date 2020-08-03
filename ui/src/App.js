import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.scss";
import Game from "./components/Game/Game";

const App = () => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  return <div className="App">{socket && <Game socket={socket} />}</div>;
};

export default App;
