function GameBoard() {
  const ROW = 3;
  const COL = 3;
  const board = [[], [], []];

  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const markBoard = (row, col, player) => {
    console.log(board[row][col].getValue(),board[row][col].getValue() === " ");
    const availableCells = board[row][col].getValue() === " ";

    if (!availableCells) return false;

    board[row][col].addToken(player);
    return true
  };

  const printBoard = () => {
    for (let row = 0; row < board.length; row++) {
      let rowString = "";
      for (let col = 0; col < board[row].length; col++) {
        rowString += board[row][col].getValue() + " | ";
      }
      console.log("-----------");
      console.log(rowString);
    }
  };

  const resetBoard = () => {
    for (let i = 0; i < ROW; i++) {
      for (let j = 0; j < COL; j++) {
        board[i][j] = Cell();
      }
    }
  };

  function checkWinner() {
    const checkLine = (a, b, c) =>
      a.getValue() === b.getValue() &&
      b.getValue() === c.getValue() &&
      a.getValue() !== " ";

    // Check rows and columns
    for (let i = 0; i < 3; i++) {
      if (checkLine(board[i][0], board[i][1], board[i][2])) {
        return true;
      }
      if (checkLine(board[0][i], board[1][i], board[2][i])) {
        return true;
      }
    }

    // Check diagonals
    if (checkLine(board[0][0], board[1][1], board[2][2])) {
      return true;
    }
    if (checkLine(board[0][2], board[1][1], board[2][0])) {
      return true;
    }

    return false;
  }
  
  const checkTie = () => {
    return board.some(row => row.some(cell => cell.getValue() === ' '));
  }

  return { getBoard, markBoard, printBoard, resetBoard, checkWinner, checkTie };
}

function Cell() {
  let value = " ";
  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addToken,
    getValue,
  };
}

function gameController(
  playerOneName = "Player X",
  playerTwoName = "Player O"
) {
  const board = GameBoard();

  const players = [
    {
      name: playerOneName,
      token: "X",
    },
    {
      name: playerTwoName,
      token: "O",
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    if (board.markBoard(row, column, getActivePlayer().token)){
        switchPlayerTurn();
        printNewRound();
    }

    /*  This is where we would check for a winner and handle that logic,
            such as a win message. */

    // Switch player turn
    
  };

  printNewRound();

  const resetBoard = () => {
    board.resetBoard();
    activePlayer = players[0];
  };

  const checkBoard = () => {
    return board.checkWinner();
  };

  const checkTie = () => {
    return board.checkTie();
  }

  return {
    switchPlayerTurn,
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
    resetBoard,
    checkBoard,
    checkTie
  };
}

function screenController() {
  const game = gameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");
  const restartButton = document.querySelector("#restart");
  let gameState = true;

  const updateScreen = () => {
    boardDiv.textContent = "";

    const board = game.getBoard();
    console.log(board);
    const activePlayer = game.getActivePlayer();

    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");

        cellButton.dataset.column = colIndex;
        cellButton.dataset.row = rowIndex;
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      });
    });
  };

  function clickHandlerboard(e) {
    if (gameState) {
      const selectedCellColumn = e.target.dataset.column;
      const selectedCellRow = e.target.dataset.row;

      if (!selectedCellColumn || !selectedCellRow) return;

      game.playRound(selectedCellRow, selectedCellColumn);

      // Check Winner
      if (game.checkBoard()) {
        game.switchPlayerTurn();
        let winner = game.getActivePlayer().name;
        updateScreen();
        gameState = false;
        playerTurnDiv.textContent = `${winner}'s Won!!`;
      } else if (!game.checkTie()) {
        updateScreen();
        playerTurnDiv.textContent = `Tie`;
        gameState = false;
      } else {
        updateScreen();
      }

    }
  }

  function restartBoard() {
    game.resetBoard();
    updateScreen();
    gameState = true;
  }

  // event listener for the board
  boardDiv.addEventListener("click", clickHandlerboard);
  restartButton.addEventListener("click", restartBoard);

  // intial call
  updateScreen();
}

screenController();
