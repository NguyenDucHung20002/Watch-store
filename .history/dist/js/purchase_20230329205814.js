import spinner from "./spinner.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "http://localhost:5000/api/";
import head from "./head.js";
const User = JSON.parse(localStorage.getItem("loginUser"));
if (!User) {
  window.location.replace("./index.html");
}

function renderProduct(data) {
  const carts = data.map((val) => {
    return `
    <div class="item">
        <img src="https://cdn.watchstore.vn/uploads/images/FC-303M4P5-2-1651548024692.jpg"
            alt="">
        <div class="product-content">
            <p class="name-product">Frederique Constant FC</p>
            <div class="product-type">
                <div class="quantity">x4</div>

                <div class="price">$400</div>
            </div>

        </div>
    </div>
    `;
  });
  $(".products").innerHTML = carts.join("");
}

function renderPurchase(data) {
  const carts = data.map((val) => {
    totalCart += val.total;
    return `
    <div class="product">
        <div class="wrapper-product">
            <img src=${val.imgBg}
                alt="">
            <div class="content">
                <div class="name">${val.name}</div>
                <div class="category-quantity">
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
