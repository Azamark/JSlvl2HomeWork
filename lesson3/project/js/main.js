const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
/**
//getRequest на Promise
let getRequest = (url) => { // не fetch
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject(new Error(xhr.status));
                } else {
                    resolve(xhr.responseText);
                }
            }
        };
        xhr.send();
    });
};
*/

class ProductList {
    constructor(container = '.products') {
        this.container = document.querySelector(container);
        this._goods = [];
        this._productsObjects = [];

        // this._fetchGoods();
        // this._render();
        this.getProducts()
            .then((data) => {
                console.log(data);
                this._goods = data;
                this._render();
                console.log(this.getTotalPrice());
            });
    }

    // _fetchGoods() {
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         // console.log(data);
    //         this._goods = JSON.parse(data);
    //         this._render();
    //         console.log(this._goods);
    //     });
    // }

    getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(response => response.json())
            .catch(err => console.log(err));
    }

    getTotalPrice() {
        return this._productsObjects.reduce((accumulator, good) => accumulator + good.price, 0);
    }

    _render() {
        for (const product of this._goods) {
            const productObject = new ProductItem(product);
            console.log(productObject);

            this._productsObjects.push(productObject);
            this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.img = img;
    }

    getHTMLString() {
        return `<div class="product-item" data-id="${this.id}">
                  <img src="${this.img}" alt="Some img">
                  <div class="desc">
                      <h3>${this.title}</h3>
                      <p>${this.price} \u20bd</p>
                      <button class="buy-btn">Купить</button>
                  </div>
              </div>`;
    }
}

class Cart {
    constructor() {

    }

    readJSON()
}

class CartItem {
    constructor(item) {
        this.id = item.id_product;
        this.name = item.product_name;
        this.cnt = item.product_cnt;
        this.price = item.product_price;
    }

    getCartItemHTML() {
        return `
                <div class = "grid__item-name" data-id="${this.id}">
                    <h4> ${this.name} </h4>
                </div>
                <div class = "grid__item-cnt" data-id="${this.id}">
                    <span> ${this.cnt} </span>
                </div>
                <div class = "grid__item-price" data-id="${this.id}">
                    <span> ${this.price} </span>
                </div>
                <div class = "grid__item-total-price" data-id="${this.id}">
                    <span> ${this.price * this.cnt} </span>
                </div>
                <div class = "grid__btn-del" data-id="${this.id}">
                    <button type="button"> X </button>
                </div>
                `
    }
}

// const cart = new Cart();
// const list = new ProductList(cart);

let item = {
    id_product: 1,
    product_name: 'TestItem',
    product_cnt: 0,
    product_price: 100
}

const list = new ProductList();

console.log(item);

let cartItem = new CartItem(item)

console.log(cartItem);
console.log(cartItem.getCartItemHTML());