import spinner from "./spinner.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "http://localhost:5000/api/";
import head from "./head.js";
const User = JSON.parse(localStorage.getItem("loginUser"));
if (!User) {
  window.location.replace("./index.html");
}

function renderProduct(data, index) {
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
  $(`.products.id-${index}`).innerHTML = carts.join("");
}

function renderPurchase(data) {
  if (data.length > 0) {
    data.forEach((val, index) => {
      const div = document.createElement("strong");
      div.classList.add("checkout-item");
      div.innerHTML = `
      <div class="checkout-item ">
            <div class="date-create">
                ${val.purchase.datetime}
            </div>
            <div class="checkout-detail row">
                <div class="products id-${index} col-12 col-md-7">
                    
                </div>
                <div class="bill col-12 col-md-5">
                    <div class="checkout-info">
                        <div class="address">
                            <div class="delivery-address">
                                <h2>Delivery Adress</h2>
                            </div>
                            <h3 class="user-name">${val.purchase.fullName}</h3>
                            <div class="live phone-number">${val.purchase.phone}</div>
                            <div class="live email">${val.purchase.email}</div>
                            <div class="live stress">${val.purchase.streetAddress}</div>
                            <div class="live coutry-city">${val.purchase.city}</div>
                            <h2 class="subtotal">
                                Subtotal: $${val.purchase.total}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      `;
      $(".wrapper-checkout").insertAdjacentElement("beforeend", div);
      renderProduct(val.purchase.carts, index);
    });
  } else {
    $(".wrapper-checkout").innerHTML = `<div class="wrapper-bill-empty">
                    <img class="bill-empty" src="./img/empty-cart.png" alt="">
                    <h2>Your bill is empty</h2>
                </div>`;
  }
}

window.addEventListener("load", function () {
  head();
  fetch(`${http}purchase/user/${User.data?.idUser}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authentication: User.token,
    },
  })
    .then((data) => data.json())
    .then((data) => {
      if (data.success) {
        console.log("data:", data.data[0].purchase.carts[0].imgBg);
        renderPurchase(data.data);
      }
    });
});
