const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
let counter = 0;
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


class ProductList {
    constructor(cart, container = '.products') {
        this.productsEl = container;
        this.cart = cart;
        this._goods = [];
        this._productsObjects = [];

        this.getProducts()
            .then((data) => {
                this._goods = data;
                this._render();
                this._addProduct();
            });
    }

    _addProduct() {
        document.querySelectorAll('.buy-btn').forEach((btn) => {
            btn.addEventListener('click', (event) => {
                let productId = event.currentTarget.dataset.id;
                this.cart.addItem(productId);
            })
        })
    }

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

            this._productsObjects.push(productObject);
            document.querySelector(this.productsEl).insertAdjacentHTML('beforeend', productObject.getHTMLString());
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
                      <button class="buy-btn" data-id="${this.id}">Купить</button>
                  </div>
              </div>`;
    }
}

class Cart {
    constructor(cartBtn = ".btn-cart", cartBody = ".cart", delBtn = "grid__btn-del",
        cartFullPrice = ".grid__full-price", cartCnt = ".grid__counter") {

        this.cartObj = {};
        this.cartBtn = cartBtn;
        this.delBtn = delBtn;
        this.cartBody = cartBody;
        this.cartFullPrice = cartFullPrice;
        this.cartCnt = cartCnt;

        this._switchCart();
        this.readAPI("/getBasket.json")
            .then(data => {
                this.cartObj = data;
                this._preRenderCart();
                this._handleDelBtn();
            });
    }

    readAPI(url) {
        return fetch(`${API + url}`)
            .then(response => response.json())
            .catch(err => console.log(err));
    }

    _switchCart() {
        document.querySelector(this.cartBtn).addEventListener('click', () => {
            if (document.querySelector(this.cartBody).style.display !== "block") {
                document.querySelector(this.cartBody).style.display = "block"
            } else {
                document.querySelector(this.cartBody).style.display = "none"
            }
        })
    }

    _handleDelBtn() {
        document.querySelector(this.cartBody).addEventListener('click', event => {
            if (event.target.classList.contains(this.delBtn)) {
                let itemId = event.target.dataset.id;
                this._delItem(itemId);
            }
        });
    }

    _preRenderCart() {
        for (const item of this.cartObj.contents) {
            this._renderCart(item);
        }
    }

    _renderCart(item) {
        const cartItem = new CartItem(item);
        document.querySelector(this.cartFullPrice).insertAdjacentHTML('beforeBegin', cartItem.getCartItemHTML());
        this._updateCart();
    }

    addItem(itemId) {
        this.readAPI('/addToBasket.json')
            .then(response => {
                if (response.result === 1) {
                    let item = this.cartObj.contents.find(el => el.id_product === +itemId);
                    if (item.quantity >= 1) {
                        this._calcCartData(item, 'add');
                        this._updateCartItem(item);
                        this._updateCart();
                    }
                    else {
                        if (item.quantity === 0) {
                            this._calcCartData(item, 'add');
                            this._renderCart(item);
                            this._updateCartItem(item);
                        }
                    }
                } else console.log('Error');
            });
    }

    _delItem(itemId) {
        this.readAPI('/deleteFromBasket.json')
            .then(response => {
                if (response.result === 1) {
                    let item = this.cartObj.contents.find(el => el.id_product === +itemId);
                    if (item.quantity > 1) {
                        this._calcCartData(item, 'del');
                        this._updateCartItem(item);
                        this._updateCart();
                    }
                    else {
                        this._calcCartData(item, 'del');
                        this._updateCartItem(item);
                        const parentEl = document.querySelector(this.cartBody);
                        parentEl.querySelectorAll(`[data-id="${item.id_product}"]`).forEach(itemEl => {
                            itemEl.remove();
                        });
                        this._updateCart();
                    }
                } else console.log('Error');
            })
    }

    _calcCartData(item, comand) {
        let k;
        if (comand === 'add') k = 1;
        if (comand === 'del') k = -1;

        item.quantity += k;
        this.cartObj.countGoods += k;
        this.cartObj.amount += item.price * k;
    }

    _updateCartItem(item) {
        document.querySelector(`.grid__item-cnt[data-id="${item.id_product}"] span`).textContent = `${item.quantity}`;
        document.querySelector(`.grid__item-total-price[data-id="${item.id_product}"] span`).textContent = `${item.price * item.quantity}`;
    }

    _updateCart() {
        document.querySelector(this.cartFullPrice).textContent = `Общая стоимость: ${this.cartObj.amount}`;
        document.querySelector(this.cartCnt).textContent = `${this.cartObj.countGoods} шт.`;
    }

}

class CartItem {
    constructor(item) {
        this.id = item.id_product;
        this.name = item.product_name;
        this.cnt = item.quantity;
        this.price = item.price;
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
                <button class = "grid__btn-del" type="button" data-id="${this.id}"> X </button>
                `
    }
}

const cart = new Cart();
const list = new ProductList(cart);

