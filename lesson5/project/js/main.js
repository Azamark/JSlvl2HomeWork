const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartAddUrl: '/addToBasket.json',
        cartDelUrl: '/deleteFromBasket.json',
        basketURL: '/getBasket.json',
        products: [],
        cartObj: {},
        filter: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        searchLine: '',
        cartHide: true,
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            this.getJson(`${API + this.cartAddUrl}`)
                .then(response => {
                    if (response.result === 1) {
                        let item = this.cartObj.contents.find(el => el.id_product === product.id_product);
                        if (item) {
                            item.quantity++;
                        } else {
                            //let newCartItem = product;
                            //newCartItem.quantity = 1;
                            //console.log(newCartItem);

                            let newCartItem = Object.assign({ quantity: 1 }, product);
                            this.cartObj.contents.push(newCartItem);
                        }
                    } else {
                        console.log('Error');
                    }
                });
        },
        delProduct(item) {
            console.log(item);
            this.getJson(`${API + this.cartDelUrl}`)
                .then(response => {
                    if (response.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartObj.contents.splice(this.cartObj.contents.indexOf(item), 1);
                        }
                    } else {
                        console.log('Error');
                    }
                });
        },
        filterGoods() {
            let regexp = new RegExp(this.searchLine, "i");
            if (regexp.test('')) {
                alert("Введите название!!!");
            } else {
                if (this.products.find(el => regexp.test(el.product_name)) === undefined) {
                    alert("Товар не найден!!!");
                } else {
                    this.filter = this.products.filter(el => regexp.test(el.product_name));
                }
            }
        },
        handleCartBtn() {
            this.cartHide = !this.cartHide;
        }
    },
    created() {
        this.getJson(`${API + this.basketURL}`)
            .then(data => {
                this.cartObj = data;
            });
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filter.push(el);
                }
            });
    },
});
