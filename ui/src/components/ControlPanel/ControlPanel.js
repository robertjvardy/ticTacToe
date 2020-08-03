import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import "./styles.scss";

const ControlPanel = ({ player, turn, victory, handleNewGame, gameOver }) => {
  var gameResultMessage;
  if (gameOver) {
    if (victory === player) {
      gameResultMessage = <p id="win">You won!</p>;
    } else if (victory !== "") {
      gameResultMessage = <p id="loss">You lose!</p>;
    } else {
      gameResultMessage = <p>You tied!</p>;
    }
  }
  return (
    <div id="control-panel-container">
      <div id="control-panel-details">
        {gameOver ? (
          gameResultMessage
        ) : (
          <>
            <p>You are playing: {player}</p>
            <p>
              {turn === player
                ? "It's your turn!"
                : "Your opponent is thinking..."}
            </p>
          </>
        )}
      </div>
      <Button
        variant="contained"
        style={{ backgroundColor: "#61dafb" }}
        disabled={!gameOver}
        onClick={() => handleNewGame()}
      >
        New Game
      </Button>
    </div>
  );
};

ControlPanel.propTypes = {
  player: PropTypes.string.isRequired,
  turn: PropTypes.string.isRequired,
  victory: PropTypes.string.isRequired,
  handleNewGame: PropTypes.func.isRequired,
  gameOver: PropTypes.bool.isRequired,
};

export default ControlPanel;
