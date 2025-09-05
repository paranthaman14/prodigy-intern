const gameboard = document.getElementById("gameboard");
const restartBtn = document.getElementById("restartBtn");
const statusMessage = document.getElementById("statusMessage");

let currentPlayer = "X";
let spaces = Array(9).fill(null);
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

function createBoard() {
    gameboard.innerHTML = '';
    spaces = Array(9).fill(null);
    currentPlayer = "X";
    statusMessage.textContent = `Current Turn: ${currentPlayer}`;

    for (let i = 0; i < 9; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.dataset.index = i;
        box.addEventListener("click", handleClick, { once: true });
        gameboard.appendChild(box);
    }
}

function handleClick(e) {
    const index = e.target.dataset.index;
    spaces[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        highlightWinner(currentPlayer);
        statusMessage.textContent = `Player ${currentPlayer} Wins! 🎉`;
        disableBoard();
        return;
    }

    if (spaces.every(space => space)) {
        highlightDraw();
        statusMessage.textContent = "It's a Draw!";
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusMessage.textContent = `Current Turn: ${currentPlayer}`;
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => spaces[index] === player);
    });
}

function highlightWinner(player) {
    const combo = winningCombinations.find(combination => {
        return combination.every(index => spaces[index] === player);
    });

    combo.forEach(index => {
        gameboard.children[index].classList.add("winning");
    });
}

function highlightDraw() {
    for (let box of gameboard.children) {
        box.classList.add("draw");
    }
}

function disableBoard() {
    for (let box of gameboard.children) {
        box.removeEventListener("click", handleClick);
    }
}

restartBtn.addEventListener("click", createBoard);

createBoard();
