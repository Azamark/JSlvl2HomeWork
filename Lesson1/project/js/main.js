'use strict'

let parentProducts = document.querySelector('.products');

const products = [
    { id: 1, title: 'Notebook', price: 1000 },
    { id: 2, title: 'Mouse', price: 100 },
    { id: 3, title: 'Keyboard', price: 250 },
    { id: 4, title: 'Gamepad', price: 150 },
];

//Функция сразу возврящает результат, поэтому return и {} не нужны
//Принятый объект из массива продуктов можно сразу деструктурировать
const renderProduct = ({ id, title, price }) => `<div class="product-item product-item_flex">
                                                    <h3>${title}</h3>
                                                    <p>${price}$</p>
                                                    <button class="by-btn" id = "${id}">Добавить</button>
                                                </div>`;

//Мы не меняем сам массив, поэтому можно воспользоваться методом forEach или for(let of) для его перебора (без .toString)
const renderProducts = (productsArr, parentElement) => {
    productsArr.forEach(product => {
        parentElement.insertAdjacentHTML('afterbegin', renderProduct(product));
    });
}

renderProducts(products, parentProducts);
