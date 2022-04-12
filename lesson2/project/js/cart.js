'use strict'

class Cart {
    constructor(elemCartCnt = '.xxxx', elemCartPrice = '.xxxx', elemCartList = '.xxxx', addToCartBtn = '.xxxx') {
        this._carObjt = { totalCnt: 0, totalPrice: 0, prods: [] };
        this._cartCnt = document.querySelector(elemCartCnt);
        this._cartPrice = document.querySelector(elemCartPrice);
        this._cartList = document.querySelector(elemCartList);
        this._addToCartBtn = document.querySelectorAll(addToCartBtn);
    }

    //Слушаем кнопки добавления в корзину. 
    //ВОПРОС! Правильно описывать обработку события нажатия на кнопку 'добавить в корзину' внутри этого класса?
    //По идеи обработка кнопок (и вообще интерфейса пользователя) - это низкий уровень абстракции и наверное для этого ужен отдельный класс?
    _listenAddBtn() {
        this._addToCartBtn.forEach((btn) => {
            btn.addEventListener('click', _clickAddToCartBtnHandler);
        })
    }

    //Обработка нажатия на кнопку определенного товара
    _clickAddToCartBtnHandler(event) {
        //получаем id товара
        id = event.currentTarget.id;
        const product = new ProductInCart(id);
        this._carObjt[prods].push(product.prodInCart)
    }

    //Расчет количества выбранного товара
    _calcProductCnt() {

    }

    //Суммарной стоимости выбранного товара
    _calcProductPrice() {

    }

    _calcCartCnt() {

    }

    _calcCatrSum() {

    }

    //рендер корзины
    renderCart() {
        //если товара в корзине нет 
        .getHTMLString()
        //иначе обновляем текущие данные
        ////////////////////////////////
        //Данные по общим сумме и счетчику
    }
}

class ProductInCart {
    constructor(id) {
        this.id = id;
        this.prodInCart = {};

        this._readProductData(id);
    }

    //Получение данных о выбранном товаре по id
    _readProductData(id) {
        //................................
        // this.prodInCart = {title, price};
    }

    //Размтка товара в корзине
    getHTMLString() {
        return `xxxxxxxxx`
    }
}
