var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

let board = null;
const players = { x: null, o: null };
let turn = "x";

const hasTwoPlayers = () => {
  return players["x"] !== null && players["o"] !== null;
};

const reset = () => {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  turn = "x";
};

const changeTurn = () => {
  turn = turn === "x" ? "o" : "x";
};

const isVictory = () => {
  // check horizontal victory
  for (var i = 0; i < 3; i++) {
    if (
      board[i][0] &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      return true;
    }
  }

  // check vertical victory
  for (var i = 0; i < 3; i++) {
    if (
      board[0][i] &&
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i]
    ) {
      return true;
    }
  }

  // check horizontal victory
  if (board[0][0] && board[0][0] == board[1][1] && board[1][1] == board[2][2])
    return true;
  if (board[0][2] && board[0][2] == board[1][1] && board[1][1] == board[2][0])
    return true;
  return false;
};

io.on("connection", (socket) => {
  reset();
  io.emit("board", board);
  io.emit("turn", turn);
  io.emit("victory", "");
  io.emit("gameOver", false);
  if (players["x"] == null) {
    players["x"] = socket;
    socket.emit("player", "x");
  } else if (players["o"] == null) {
    players["o"] = socket;
    socket.emit("player", "o");
    reset();
    io.emit("turn", turn);
    io.emit("board", board);
  } else {
    socket.emit("player", "isFull");
    socket.disconnect();
  }
  io.emit("twoPlayers", hasTwoPlayers());

  socket.on("click", (col, row) => {
    if (socket == players[turn]) {
      board[row][col] = turn;
      io.emit("board", board);
      if (
        !board[0].includes("") &&
        !board[1].includes("") &&
        !board[2].includes("")
      ) {
        io.emit("gameOver", true);
      }
      if (isVictory()) {
        io.emit("victory", turn);
        io.emit("gameOver", true);
      }
      changeTurn();
      io.emit("turn", turn);
    }
  });

  socket.on("reset", () => {
    reset();
    io.emit("board", board);
    io.emit("turn", turn);
    io.emit("victory", "");
    io.emit("gameOver", false);
  });

  socket.on("disconnect", function () {
    if (players["x"] === socket) {
      players["x"] = null;
      socket.disconnect();
    } else if (players["o"] === socket) {
      players["o"] = null;
      socket.disconnect();
    }
    reset();
    io.emit("board", board);
    io.emit("turn", turn);
    io.emit("victory", "");
    io.emit("gameOver", false);
    io.emit("twoPlayers", hasTwoPlayers());
  });
});

http.listen(5000, () => {
  console.log("listening on *:5000");
});
