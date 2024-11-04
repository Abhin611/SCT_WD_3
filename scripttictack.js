// Tic-Tac-Toe Functionality
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetTicTacToeButton = document.getElementById('resetButtontictactoe');
const vsComputerCheckbox = document.getElementById('vsComputer');

if (boardElement) {
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    resetTicTacToeButton.addEventListener('click', resetButtontictactoe);
    createTicTacToeBoard();

    function createTicTacToeBoard() {
        boardElement.innerHTML = '';
        board.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.setAttribute('data-index', index);
            cellElement.innerText = cell;

            cellElement.addEventListener('click', () => handleTicTacToeCellClick(index));
            boardElement.appendChild(cellElement);
        });
    }

    function handleTicTacToeCellClick(index) {
        if (board[index] === '' && isGameActive) {
            board[index] = currentPlayer;
            checkTicTacToeWin();
            if (isGameActive) {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                if (vsComputerCheckbox.checked && currentPlayer === 'O') {
                    computerTicTacToeMove();
                }
            }
            createTicTacToeBoard();
        }
    }

    function checkTicTacToeWin() {
        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        for (const condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                statusElement.innerText = `${board[a]} wins!`;
                isGameActive = false;
                return;
            }
        }

        if (!board.includes('')) {
            statusElement.innerText = "It's a draw!";
            isGameActive = false;
        }
    }

    function computerTicTacToeMove() {
        const availableCells = board.map((cell, index) => cell === '' ? index : null).filter(cell => cell !== null);
        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        if (randomIndex !== undefined) {
            board[randomIndex] = currentPlayer;
            checkTicTacToeWin();
            if (isGameActive) {
                currentPlayer = 'X'; // Switch back to player
            }
            createTicTacToeBoard();
        }
    }

    function resetButtontictactoe() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        isGameActive = true;
        statusElement.innerText = '';
        createTicTacToeBoard();
    }
}
