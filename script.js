const gamerInfo = document.querySelector('.gamer'),
      gameBoard = document.querySelector('.board'),
      numberOfCell = 9; // количество ячеек

let cell,
    innerCell;

let scoreFirst = 0,
    scoreSecond = 0,
    player  = true, // Игрок X-true, Y-false
    numberOfCount  = 9,
    gameTable = [[null, null, null], [null, null, null], [null, null, null]], //Матрица поля
    winner = null;

let firstPlayer = document.querySelector('.first-player'),
    secondPlayer = document.querySelector('.second-player');

window.onload = () => {// Генерируем игровое поле     
    gamerInfo.textContent = 'Ходит игрок Х';
    for (let i = 0; i < numberOfCell; i++) {
        cell = document.createElement('div');
        cell.classList.add('cell');
        innerCell = document.createElement('div');
        innerCell.classList.add('inner-cell');
        innerCell.addEventListener('click', tableClick);
        innerCell.setAttribute('y', (i % 3).toString()); // Генерируем столбцы
        innerCell.setAttribute('x', parseInt(i / 3).toString()); // Генерируем строки
        cell.appendChild(innerCell); // Добавляем содержимое ячеек в ячейку
        gameBoard.appendChild(cell); // Каждую ячейку добавляем в игровое поле
    }
}

const newGame = () => { // Обновляем все переменные для новой игры
    score = 0, 
    player  = true,
    numberOfCount  = 9,
    gameTable = [[null, null, null], [null, null, null], [null, null, null]],
    winner = null;
    let table = document.querySelectorAll('.inner-cell');
    for (let cell of table) {
        cell.textContent = '';
    }
    gamerInfo.textContent = 'Сейчас ходит игрок X';
};

const tableClick = (e) => {
    if(e.target.textContent == '') { // Если ячейка пустая, то
        e.target.textContent = player ? 'X' : 'O';
        let x = e.target.getAttribute('x'), // Получаем значение из атрибута х
            y = e.target.getAttribute('y'); // Получаем значение из атрибута y
        gameTable[x][y] = player; // Присваиваем значение игрока ячейке по которой кликнули
        numberOfCount--;// Снимаем попытку
        if ((gameTable[x][0] === player && gameTable[x][1] === player && gameTable[x][2] === player) || // Проверка победителя перечислением всех возможных комбинаций
            (gameTable[0][y] === player && gameTable[1][y] === player && gameTable[2][y] === player) ||
            (gameTable[0][0] === player && gameTable[1][1] === player && gameTable[2][2] === player) ||
            (gameTable[2][0] === player && gameTable[1][1] === player && gameTable[0][2] === player)) {
            winner = player; 
            if (winner) {
                scoreFirst++;
                firstPlayer.textContent += scoreFirst;
            } else {
                scoreSecond++;
                secondPlayer.textContent += scoreSecond;
            }
        }

        player = !player; // Меняем игрока
        gamerInfo.textContent = player ?'Сейчас ходит игрок X' : 'Сейчас ходит игрок О'; // Выводим соответсвующий текст

        if(numberOfCount == 0 || winner != null) { // Проверяем есть ли победитель и кончились ли попытки
            if(winner != null) {
                if(confirm('Победил игрок ' + (winner ? 'X' : 'O') + '\nЖелаете сыграть ещё?'));
                newGame();
            } else if (confirm('Ничья\nЖелаете сыграть еще?')){
                newGame();
            }
        }
    } else {
        alert('Недопустимый ход'); // Если ячейка не пустая, то выводится alert
    }
};
