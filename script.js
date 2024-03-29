const Rows = 6;
const Cols = 7;
let Player1 = null;
let Player2 = null;

let gameBoard = [];
let table = null;
let timer = null;

let currentPlayer = null;

window.addEventListener("load", init);

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    Player1 = urlParams.get('player1');
    Player2 = urlParams.get('player2');

    currentPlayer = Player1;
    
    table = document.getElementById("grid");
    for (let row = 0; row < Rows; row++) {
        let newRow = [];
        for (let col = 0; col < Cols; col++) {
            newRow.push(0);
            table.rows[row].cells[col].addEventListener("click", function () {dropBlock(col);});
        }
        gameBoard.push(newRow);
    }
    timer = setInterval(moveBlockDown, 200);
}

function dropBlock(col) {
    for (let row = Rows - 1; row >= 0; row--) {
        if (gameBoard[row][col] === 0) {
            gameBoard[row][col] = currentPlayer;
            drawBlock(row, col);
            checkWin(row, col);
            switchPlayer();
            return;
        }
    }
}

function switchPlayer() {
    currentPlayer = (currentPlayer === Player1) ? Player2 : Player1;
}

function drawBlock(row, col) {
    const cell = table.rows[row].cells[col];
    cell.classList.add(currentPlayer === Player1 ? 'player1' : 'player2');
}

function checkWin(row, col) {
    const directions = [
        [[-1, 0], [1, 0]], // 상하
        [[0, -1], [0, 1]], // 좌우
        [[-1, -1], [1, 1]], // 대각선 \
        [[-1, 1], [1, -1]] // 대각선 /
    ];

    for (let i = 0; i < directions.length; i++) {
        const direction = directions[i];
        let count = 1;

        for (let j = 0; j < direction.length; j++) {
            const d = direction[j];
            let newRow = row + d[0];
            let newCol = col + d[1];

            while (newRow >= 0 && newRow < Rows && newCol >= 0 && newCol < Cols &&
                gameBoard[newRow][newCol] === currentPlayer) {
                count++;
                newRow += d[0];
                newCol += d[1];
            }
        }

        if (count >= 4) {
            win();
            return;
        }
    }
}

function win() { //리턴하고 alert
    clearInterval(timer);
    alert("플레이어 " + currentPlayer + " 승리!");
}
