import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cell from "../Cell";
import "./styles.scss";

const Board = ({ gameState, handleClick }) => {
  const renderRow = (row) => {
    return (
      <>
        <Cell
          value={gameState[row][0]}
          handleClick={() => handleClick(0, row)}
        />
        <Cell
          value={gameState[row][1]}
          handleClick={() => handleClick(1, row)}
          classes="middle-column"
        />
        <Cell
          value={gameState[row][2]}
          handleClick={() => handleClick(2, row)}
        />
      </>
    );
  };

  return (
    <div className="board-container">
      <div className="board-row">{renderRow(0)}</div>
      <div className="board-row middle-row">{renderRow(1)}</div>
      <div className="board-row">{renderRow(2)}</div>
    </div>
  );
};

Board.propTypes = {
  player: PropTypes.string.isRequired,
  gameState: PropTypes.any.isRequired,
};

export default Board;
