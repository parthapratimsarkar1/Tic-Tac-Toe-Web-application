const cells = document.querySelectorAll('[data-cell]');
const statusDisplay = document.getElementById('game-status');
const restartButton = document.getElementById('restart-btn');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (boardState[cellIndex] !== '' || !gameActive) {
        return;
    }

    boardState[cellIndex] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    cell.textContent = currentPlayer;

    checkGameResult();
};

const checkGameResult = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
        animateWinningSequence();
        return;
    }

    if (!boardState.includes('')) {
        statusDisplay.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
};

const animateWinningSequence = () => {
    // Example animation: Flash the background of the winning board
    document.querySelector('.board').style.animation = 'flash 1s ease infinite alternate';
    setTimeout(() => {
        document.querySelector('.board').style.animation = '';
    }, 3000);
};

const resetGame = () => {
    currentPlayer = 'X';
    gameActive = true;
    boardState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = `Player X's Turn`;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
};

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', resetGame);
