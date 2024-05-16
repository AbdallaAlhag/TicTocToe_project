function GameBoard(){
    const ROW = 3;
    const COL = 3;
    const board = [[],[],[]]

    for (let i = 0; i < ROW; i++){
        for (let j = 0; j < COL; j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const markBoard = (row,col, player) => {
        console.log(board[row][col].getValue() === ' ')
        const availableCells = board[row][col].getValue() === ' ';

        if (!availableCells) return;

        board[row][col].addToken(player);
        console.log('hiii')
    };

    const printBoard = () => {
        // console.log("ROUND: " + (round+1))
        for (let row = 0; row < board.length; row++){
            let rowString = '';
            for (let col = 0; col < board[row].length; col++){
                rowString += board[row][col].getValue() + ' | ';
            }
            console.log('-----------')
            console.log(rowString)
        }
    }
    return { getBoard, markBoard, printBoard}
}

function Cell(){
    let value = ' ';
    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        addToken,
        getValue
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
            token: 'X'
        },
        {
            name: playerTwoName,
            token: 'O'
        }
    ];

    let activePlayer = players[0]

    const switchPlayerTrun = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };


    const playRound = (row, column) => {
        board.markBoard(row,column, getActivePlayer().token);

        /*  This is where we would check for a winner and handle that logic,
            such as a win message. */

        // Switch player turn
        switchPlayerTrun();
        printNewRound();
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard
    };
}

function screenController(){
    const game = gameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const updateScreen = () => {
        boardDiv.textContent = '';

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add("cell");

                cellButton.dataset.column = colIndex;
                cellButton.dataset.row = rowIndex
                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            })
        })
    }

    function clickHandlerboard(e) {
        const selectedCellColumn = e.target.dataset.column;
        const selectedCellRow = e.target.dataset.row;

        if (!selectedCellColumn || !selectedCellRow) return;

        game.playRound(selectedCellRow,selectedCellColumn)
        updateScreen();
    }

    // event listener for the board
    boardDiv.addEventListener("click", clickHandlerboard);
    
    // intial call
    updateScreen();
}

screenController();



// let board = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']]

// console.log(board);
// // console.log(board[0][0]);
// // console.log(' ');
// // console.log(board[0][0] == ' ');

// function drawBoard(round){
//     console.log("ROUND: " + (round+1))
//     for (let row = 0; row < board.length; row++){
//         let rowString = '';
//         for (let col = 0; col < board[row].length; col++){
//             rowString += board[row][col] + ' | '
//         }
//         console.log('-----------')
//         console.log(rowString)
//     }
// }


// function availableMove(r,c){
//     // One value is missing
//     if (r === '' || r === null || c === '' || c === null){
//         return false
//     }
//     // Out of bounds check
//     if (r < 0 || r >= board.length || c < 0 || c >= board[0].length){
//         return false
//     }
//     // Check if piece is filled
//     if (board[r][c] == ' ') {
//         return true
//     } else {
//         return false
//     }
// }

// function checkWinner(){
//     // Check rows
//     for (let r = 0; r < board.length; r++){
//         if (board[r][0] === board[r][1] && board[r][1] === board[r][2]){
//             return true
//         }
//     }

//     // Check columns
//     for (let c = 0; c < board[0].length; c++){
//         if (board[0][c] === board[1][c] && board[1][c] === board[2][c]){
//             return true
//         }
//     }
    
//     // Check diagnol
//     if (board[0][0] === board[1][1] && board[1][1] === board[2][2] || board[0][2] === board[1][1] && board[1][1] === board[0][2]){
//         return true
//     }
    
//     return false
// }


// function game(){
//     let index = 0;
//     while (index < 9){
//         drawBoard(index);
//         let x = prompt('Enter a x coordinate');
//         let y = prompt("Enter a y coordinate");

//         while (!availableMove(x,y)){
//             alert("Not available!")
//             x = prompt('Enter a x coordinate');
//             y = prompt("Enter a y coordinate");
//         }

//         if (index % 2 == 0) {
//             board[x][y] = 'X';
//         }else {
//             board[x][y] = 'O'
//         }
        
//         if (checkWinner()){
//             drawBoard(index);
//             if (index % 2 == 0){
//                 console.log("X is the winner")
//             } else{
//                 console.log("O is the winner")
//             }
//             break;
//         }
//         index += 1
//     }
//     console.log('game Over!');
//     board = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];
//     menu();
// }

// function menu(){
//     let start = prompt('would you like to play?')

//     if (start === 'yes'){
//         game();
//     }

// }

// // menu();