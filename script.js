const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('gameStatus');
const resetButton = document.getElementById('reset');
const playerVsPlayerButton = document.getElementById('playerVsPlayer');
const playerVsComputerButton = document.getElementById('playerVsComputer');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let isVsComputer = false;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedIndex = clickedCell.getAttribute('data-index');

    if (board[clickedIndex] !== '' || !isGameActive) return;

    updateCell(clickedCell, clickedIndex);
    checkForWinOrDraw();

    if (isVsComputer && isGameActive && currentPlayer === 'O') {
        computerMove();
    }
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = `It's ${currentPlayer}'s turn`;
}

function checkForWinOrDraw() {
    let roundWon = false;

    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        const [a, b, c] = WINNING_COMBINATIONS[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameStatus.textContent = `Player ${currentPlayer} has won!`;
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        gameStatus.textContent = 'It\'s a draw!';
        isGameActive = false;
        return;
    }

    changePlayer();
}

function computerMove() {
    let availableIndices = board
        .map((cell, index) => (cell === '' ? index : null))
        .filter((index) => index !== null);

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    const cell = document.querySelector(`.cell[data-index='${randomIndex}']`);

    setTimeout(() => {
        updateCell(cell, randomIndex);
        checkForWinOrDraw();
    }, 500);
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    isVsComputer = false;
    cells.forEach(cell => cell.textContent = '');
    gameStatus.textContent = 'Select a mode to start the game!';
    resetButton.classList.add('hidden');
}

function startPlayerVsPlayer() {
    isVsComputer = false;
    startGame();
}

function startPlayerVsComputer() {
    isVsComputer = true;
    startGame();
}

function startGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    cells.forEach(cell => cell.textContent = '');
    gameStatus.textContent = `It's ${currentPlayer}'s turn`;
    resetButton.classList.remove('hidden');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
playerVsPlayerButton.addEventListener('click', startPlayerVsPlayer);
playerVsComputerButton.addEventListener('click', startPlayerVsComputer);