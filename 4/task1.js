function getPassword(pass) {
    return function(pwd) {
        if (pwd === pass) {
            return 'Correct password';
        } else {
            return 'Incorrect password;'
        }
    }
}

const checker = getPassword('hello_world');

console.log(checker('hello_world'));
console.log(checker('hello_word'));