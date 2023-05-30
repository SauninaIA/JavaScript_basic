let items = [
    {
        id: 1,
        name: "Футболка",
        description: "text",
        sizes: ['XS', 'S', 'L'],
        price: 500,
        available: true,
    },
    {
        id: 3,
        name: "Свитер",
        description: "text",
        sizes: ["M", 'XL'],
        price: 1500,
        available: true,
    },
    {
        id: 674,
        name: "Рубашка",
        description: "text",
        sizes: [38, 39, 42],
        price: 700,
        available: true,
    },
    {
        id: 12,
        name: "Джинсы",
        description: "text",
        sizes: [38, 40, 42],
        price: 2000,
        available: true,
    },
    {
        id: 555,
        name: "Шорты",
        description: "text",
        sizes: [34, 36],
        price: 700,
        available: true,
    },

];

let cart = [];


cart.addItem = function (index, amount) {
    this.push({
        item: index,
        amount,
    })
}

cart.removeItem = function (index, amount) {
    for (let i = 0; i < this.length; ++i) {
        if (this[i].item == index) {
            if (amount >= this[i].amount) {
                this.splice(i, 1);
                return;
            }

            this[i].amount -= amount;
        }
    }
}

cart.clear = function () {
    this.splice(0, this.length);
}

cart.getTotal = function (items) {
    result = {
        totalAmount: 0,
        totalSumm: 0,
    }

    for (let el of this) {
        result.totalAmount += el.amount;
        result.totalSumm += items[el.item].price * el.amount;
    }

    return result;
}


function main(cart, items) {
    cart.addItem(0, 5);
    cart.removeItem(0, 2);
    cart.addItem(1, 3);
    cart.addItem(2, 5);
    cart.addItem(3, 5);
    cart.removeItem(3, 1);

    console.log(cart)
    console.log(cart.getTotal(items));
    cart.clear();
    console.log(cart.getTotal(items));
}


main(cart, items);