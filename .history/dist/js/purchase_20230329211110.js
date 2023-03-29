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
        <img src="${val.imgBg}"
            alt="">
        <div class="product-content">
            <p class="name-product">${val.name}</p>
            <div class="product-type">
                <div class="quantity">x${val.quantity}</div>

                <div class="price">$${val.total}</div>
            </div>

        </div>
    </div>
    `;
  });
  $(".products").innerHTML = carts.join("");
}

function renderPurchase(data) {
  const carts = data.map((val) => {
    return `
    <div class="checkout-item">
          <div class="date-create">
              ${val.datetime}
          </div>
          <div class="checkout-detail row">
              <div class="products col-12 col-md-7">
                  ${renderProduct(val.carts)}
              </div>
              <div class="bill col-12 col-md-5">
                  <div class="checkout-info">
                      <div class="address">
                          <div class="delivery-address">
                              <h2>Delivery Adress</h2>
                          </div>
                          <h3 class="user-name">${fullName}</h3>
                          <div class="live phone-number">${val.phone}</div>
                          <div class="live email">${val.email}</div>
                          <div class="live stress">${val.streetAddress}</div>
                          <div class="live coutry-city">${val.city}</div>
                          <h2 class="subtotal">
                              Subtotal: $${val.total}
                          </h2>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    `;
  });
  $(".wrapper-checkout").innerHTML = carts.join("");
}

window.addEventListener("load", function () {
  head();
  fetch(`${http}purchase/user/${User.data?.idUser}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authentication: User.token,
    },
  });
});
