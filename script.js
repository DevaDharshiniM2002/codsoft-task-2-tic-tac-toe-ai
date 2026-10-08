const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const restartButton = document.getElementById("restartButton");

const HUMAN = "X";
const AI = "O";

let board = ["", "", "", "", "", "", "", ""];
let gameOver = false;


/*
    All possible winning combinations
*/
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];


/*
    Create the game board
*/
function createBoard() {

    boardElement.innerHTML = "";

    board.forEach((value, index) => {

        const cell = document.createElement("div");

        cell.classList.add("cell");

        cell.textContent = value;

        if (value === HUMAN) {
            cell.classList.add("x");
        }

        if (value === AI) {
            cell.classList.add("o");
        }

        cell.addEventListener("click", () => humanMove(index));

        boardElement.appendChild(cell);
    });
}


/*
    Human player's move
*/
function humanMove(index) {

    if (gameOver || board[index] !== "") {
        return;
    }

    board[index] = HUMAN;

    createBoard();

    if (checkGameOver()) {
        return;
    }

    statusElement.textContent = "AI is thinking...";

    setTimeout(() => {
        aiMove();
    }, 350);
}


/*
    AI player's move
    Uses Minimax to find the best move.
*/
function aiMove() {

    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < board.length; i++) {

        if (board[i] === "") {

            board[i] = AI;

            const score = minimax(board, 0, false);

            board[i] = "";

            if (score > bestScore) {

                bestScore = score;
                bestMove = i;
            }
        }
    }

    if (bestMove !== null) {
        board[bestMove] = AI;
    }

    createBoard();

    if (!checkGameOver()) {
        statusElement.textContent = "Your turn - Choose a cell";
    }
}


/*
    Minimax Algorithm

    AI tries to maximize the score.
    Human player tries to minimize the score.
*/
function minimax(currentBoard, depth, isMaximizing) {

    const result = evaluateBoard(currentBoard);

    if (result !== null) {

        if (result === AI) {
            return 10 - depth;
        }

        if (result === HUMAN) {
            return depth - 10;
        }

        if (result === "draw") {
            return 0;
        }
    }


    if (isMaximizing) {

        let bestScore = -Infinity;

        for (let i = 0; i < currentBoard.length; i++) {

            if (currentBoard[i] === "") {

                currentBoard[i] = AI;

                const score = minimax(
                    currentBoard,
                    depth + 1,
                    false
                );

                currentBoard[i] = "";

                bestScore = Math.max(bestScore, score);
            }
        }

        return bestScore;

    } else {

        let bestScore = Infinity;

        for (let i = 0; i < currentBoard.length; i++) {

            if (currentBoard[i] === "") {

                currentBoard[i] = HUMAN;

                const score = minimax(
                    currentBoard,
                    depth + 1,
                    true
                );

                currentBoard[i] = "";

                bestScore = Math.min(bestScore, score);
            }
        }

        return bestScore;
    }
}


/*
    Evaluate the current board
*/
function evaluateBoard(currentBoard) {

    for (const combination of winningCombinations) {

        const [a, b, c] = combination;

        if (
            currentBoard[a] !== "" &&
            currentBoard[a] === currentBoard[b] &&
            currentBoard[a] === currentBoard[c]
        ) {

            return currentBoard[a];
        }
    }

    if (!currentBoard.includes("")) {
        return "draw";
    }

    return null;
}


/*
    Check whether the current game is over
*/
function checkGameOver() {

    const result = evaluateBoard(board);

    if (result === HUMAN) {

        statusElement.textContent = "You Win!";

        gameOver = true;

        highlightWinningCells(HUMAN);

        return true;
    }

    if (result === AI) {

        statusElement.textContent = "AI Wins!";

        gameOver = true;

        highlightWinningCells(AI);

        return true;
    }

    if (result === "draw") {

        statusElement.textContent = "It's a Draw!";

        gameOver = true;

        return true;
    }

    return false;
}


/*
    Highlight winning cells
*/
function highlightWinningCells(player) {

    for (const combination of winningCombinations) {

        const [a, b, c] = combination;

        if (
            board[a] === player &&
            board[b] === player &&
            board[c] === player
        ) {

            const cells = document.querySelectorAll(".cell");

            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");

            break;
        }
    }
}


/*
    Restart the game
*/
function restartGame() {

    board = ["", "", "", "", "", "", "", ""];

    gameOver = false;

    statusElement.textContent = "Your turn - Choose a cell";

    createBoard();
}


/*
    Restart button event
*/
restartButton.addEventListener("click", restartGame);


/*
    Start the game
*/
createBoard();