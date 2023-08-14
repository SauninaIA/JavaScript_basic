class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }

    setAvailable(status) {
        this.available = status;
    }
}

class GoodsList {
    
    #goods; 

    constructor(goods, filter, sortPrice, sortDir) {
        this.#goods = goods;
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    get list() {
        let result = this.#goods;

        if (this.filter) {
            result = this.#goods.filter(good => this.filter.test(good.name));
        }

        if ((this.sortPrice) && (this.sortDir)) {
            result = result.sort((good1, good2) => good1.price > good2.price ? 1 : -1);
        }
        
        else if ((this.sortPrice) && (!this.sortDir)) {
            result = result.sort((good1, good2) => good1.price > good2.price ? -1 : 1);
        }
        
        return result;
    }

    add(newGood) {
        this.#goods.push(newGood);
    }

    remove(id) {
        let i;
        for (i = 0; i < this.#goods.length; i++) {
            if (this.#goods[i].id === id) {
                this.#goods.splice(i, 1);
            }
        }
    }
}

class BasketGood extends Good {
    constructor(id, name, description, sizes, price, available, amount) {
        super(id, name, description, sizes, price, available);
        this.amount = amount;
    }
}

class Basket {
    constructor(goods) {
        this.goods = goods;
    }

    get totalAmount() {
        const result = this.goods.reduce((acc, good) => acc + good.price * good.amount, 0);
        return result;
    }

    get totalSum() {
        const result = this.goods.reduce((acc, good) => acc + good.amount, 0);
        return result;
    }

    add(good, amount) {
        if (this.goods.find((element) => element.id === good.id)) {
            return (this.goods[
            this.goods.findIndex((element) => element.id === good.id)
            ].amount += amount);
        } 
        else {
            let basketGood = new BasketGood(
                good.id,
                good.name,
                good.description,
                good.sizes,
                good.price,
                good.available,
                amount
            );
            return this.goods.push(basketGood);
        }
    }

    remove(good, amount) {
        let i;
        for (i = 0; i < this.goods.length; i++) {
            if (this.goods[i].id === good.id) {
                if (this.goods[i].amount <= amount) {
                    this.goods.splice(i, 1);
                }
                else {
                    this.goods[i].amount = this.goods[i].amount - amount;
                }
            }
        }
    }
 
    clear() {
        this.goods.splice(0, this.goods.length);
    }

    removeUnavailable() {
        return (this.goods = this.goods.filter((good) => good.available === true));
    }
}

const good1 = new Good (1, "Рубашка", "Зеленая", ["XS", "S", "M"], 1000, true);
const good2 = new Good (2, "Свитер", "Мужской", ["L", "XL"], 1500, true);
const good3 = new Good (3, "Джинсы", "Черные", ["M", "L"], 1500, false);
const good4 = new Good (4, "Свитер", "Детский", ["XS", "S"], 1000, true);
const good5 = new Good (5, "Свитер", "Женский", ["M", "L"], 2500, true);

const goodsList = new GoodsList([]);

console.log(good3);

good3.setAvailable(true);

console.log(good3);

goodsList.add(good1);
goodsList.add(good2);
goodsList.add(good3);
goodsList.add(good4);
goodsList.add(good5);

console.log(goodsList.list);

const filteredGoodsList = new GoodsList(goodsList.list, /тер/);
console.log(`Отфильтрованный список по ключу ${filteredGoodsList.filter} :`, filteredGoodsList.list);

const sortedGoodsList1 = new GoodsList(goodsList.list, undefined, true, true);
console.log(`Отсортированный список по цене по возрастанию:`, sortedGoodsList1.list);

const sortedGoodsList2 = new GoodsList(goodsList.list, undefined, true, false);
console.log(`Отсортированный список по цене по убыванию:`, sortedGoodsList2.list);

const sortedAndFilteredGoodsList = new GoodsList(goodsList.list, /тер/, true, true);
console.log(`Отфильтрованный список по ключу ${sortedAndFilteredGoodsList.filter} + отсортированный по возрастанию:`, sortedAndFilteredGoodsList.list);

const sortedAndFilteredGoodsList1 = new GoodsList(goodsList.list, /тер/, true, false);
console.log(`Отфильтрованный список по ключу ${sortedAndFilteredGoodsList1.filter} + отсортированный по убыванию:`, sortedAndFilteredGoodsList1.list);

goodsList.remove(1);

console.log(goodsList.list);

const basket = new Basket([]);

good1.setAvailable(false);
good4.setAvailable(false);
good2.price = 2000;

basket.add(good1, 3);
basket.add(good2, 5);
basket.add(good3, 2);
basket.add(good3, 4);
basket.add(good4, 1);

console.log(`Товары в корзине:`, basket);
console.log(`Общее количество товаров:`, basket.totalSum);
console.log(`Общая стоимость товаров:`, basket.totalAmount);

basket.remove(good3, 6);
basket.remove(good2, 4);

console.log(`Товары в корзине:`, basket);
console.log(`Общее количество товаров:`, basket.totalSum);
console.log(`Общая стоимость товаров:`, basket.totalAmount);

basket.removeUnavailable();
console.log(`Доступные товары:`, basket);

basket.clear();
console.log(`Товары в корзине:`, basket);