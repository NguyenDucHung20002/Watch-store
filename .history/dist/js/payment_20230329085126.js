// spinner();
import spinner from "./spinner.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "http://localhost:5000/api/";
import head from "./head.js";

function renderProduct(data) {
  let totalCart = 0;
  const carts = data.map((val) => {
    totalCart += val.total;
    return `
    <div class="product">
        <div class="wrapper-product">
            <img src=${val.img}
                alt="">
            <div class="content">
                <div class="name">${val.name}</div>
                <div class="category-quantity">
                    <div class="category">${val.category}</div>
                    <div class="quantity">x${val.quantity}</div>
                </div>
            </div>
        </div>
        <div class="product-total">$${val.total}</div>
    </div>       
    `;
  });
  $(".subtotal-detail").innerHTML = `$${totalCart}`;
  $(".products").innerHTML = carts.join("");
}

window.addEventListener("load", function () {
  head();
});