function isPrimeNum(num) {
    if (num < 2) {
        return false;
    }

    if (num === 2) {
        return true;
    }

    for (i = 2; i < Math.sqrt(num) + 1; ++i) {
        if (num % i == 0) {
            return false;
        }
    }

    return true;
}


function primeNumsList(numCount) {
    let res = [];
    let num = 2;
    while (res.length < numCount) {
        if (isPrimeNum(num)) {
            res.push(num);
        }
        ++num;
    }
    return res;
}


function main() {
    let numCount = process.argv[2];

    if (numCount === undefined) {
        console.log("undefined");
        return;
    }

    numCount = parseInt(numCount)
    if (isNaN(numCount)) {
        console.log("not number");
        return;
    }

    let primeNumbers = primeNumsList(numCount);

    console.log(primeNumbers);
}

main();