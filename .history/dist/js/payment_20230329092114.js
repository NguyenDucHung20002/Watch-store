// spinner();
import spinner from "./spinner.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "http://localhost:5000/api/";
import head from "./head.js";
const User = JSON.parse(localStorage.getItem("loginUser"));
if (!User) {
  //   window.location.replace("./index.html");
}
const carts = [
  {
    img: "https://cdn.watchstore.vn/uploads/images/FC-303M4P5-2-1651548024692.jpg",
    name: "Frederique Constant FC",
    quantity: 3,
    total: 3000,
  },
];
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
