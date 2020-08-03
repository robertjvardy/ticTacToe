import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import Board from "../Board";
import ControlPanel from "../ControlPanel";

const Game = ({ socket }) => {
  const [player, setPlayer] = useState();
  const [turn, setTurn] = useState();
  const [victory, setVictory] = useState();
  const [isFull, setIsFull] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [twoPlayers, setTwoPlayers] = useState(true);
  const [gameState, setGameState] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  socket.on("player", (player) => {
    if (player === "isFull") {
      setIsFull(true);
    } else {
      setPlayer(player);
    }
  });

  socket.on("turn", (newTurn) => setTurn(newTurn));
  socket.on("victory", (newVictory) => setVictory(newVictory));
  socket.on("board", (newBoardState) => setGameState(newBoardState));
  socket.on("gameOver", (newGameState) => setGameOver(newGameState));
  socket.on("twoPlayers", (hasTwoPlayers) => {
    console.log(hasTwoPlayers);
    setTwoPlayers(hasTwoPlayers);
  });

  const handleClick = (col, row) => {
    if (!victory) socket.emit("click", col, row);
  };

  const handleNewGame = () => socket.emit("reset");

  const gameFull = (
    <>
      <h1 id="waiting-title">Sorry, there are already two users playing!</h1>
      <p id="waiting-message">Waiting for a player to leave...</p>
    </>
  );

  const missingPlayerMessage = (
    <>
      <h1 id="waiting-title">Waiting for another player...</h1>
      <p id="waiting-message">Game will begin when another player connects.</p>
    </>
  );

  const game = twoPlayers ? (
    <div id="game-container">
      <Board handleClick={handleClick} gameState={gameState} />
      <ControlPanel
        player={player}
        turn={turn}
        victory={victory}
        handleNewGame={handleNewGame}
        gameOver={gameOver}
      />
    </div>
  ) : (
    missingPlayerMessage
  );

  return (
    <>
      <h1 id="page-title">Tic-Tac-Toe</h1>
      <div id="page-container">{isFull ? gameFull : game}</div>
    </>
  );
};

Game.propTypes = {
  socket: PropTypes.any.isRequired,
};

export default Game;
