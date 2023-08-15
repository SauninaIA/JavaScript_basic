const rl = require('readline').createInterface(process.stdin, process.stdout);
const numberToGuess = Math.floor(Math.random() * 1000);
const fs = require('fs');
fs.writeFile('log.txt', `Загаданное число: ${numberToGuess}\n`, { flag: 'a'}, () => {});

function guessGame(count = 0) {
    rl.question('Угадайте число: ', (numb) => {
        count++;
        let message;
        if (isNaN(numb)) {
            message = `Некорректный ввод. Попыток: ${count}`;
        } else if (+numb > numberToGuess) {
            message = `Попробуйте снова! Вы ввели число больше загаданного. Попыток: ${count}`;
        } else if (+numb < numberToGuess) {
            message = `Попробуйте снова! Вы ввели число меньше загаданного. Попыток: ${count}`;
        } else if (+numb === numberToGuess) {
            message = `Вы угадали! Попыток: ${count}`;
            console.log(message, `Протокол игры записан в logs.txt.`);
            fs.writeFile('log.txt', `${numb}\n${message}\n`, { flag: 'a'}, () => {});
            rl.close();
            return
        } else if (numb === 'quit') {
            rl.close();
            return
        }
        console.log(message);
        fs.writeFile('log.txt', `${numb}\n${message}\n`, { flag: 'a'}, () => {});
        guessGame(count);
    })
}

guessGame();