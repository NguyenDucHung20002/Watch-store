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
                ${val?.datetime}
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
                            <h3 class="user-name">${val?.fullName}</h3>
                            <div class="live phone-number">${val?.orderId}</div>
                            <div class="live phone-number">${val?.phone}</div>
                            <div class="live email">${val?.email}</div>
                            <div class="live stress">${val?.streetAddress}</div>
                            <div class="live coutry-city">${val?.city}</div>
                            <h2 class="subtotal">
                                Subtotal: $${val?.total}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      `;
      $(".wrapper-checkout").insertAdjacentElement("beforeend", div);
      renderProduct(val.orders, index);
    });
  } else {
    $(".wrapper-checkout").innerHTML = `
    <div class="wrapper-bill-empty">
        <img class="bill-empty" src="./img/empty-cart.png" alt="">
        <h2>Your bill is empty</h2>
    </div>`;
  }
}

window.addEventListener("load", function () {
  head();
  fetch(`${http}/order`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authentication: User.token,
    },
  })
    .then((data) => data.json())
    .then((data) => {
      console.log("data:", data);
      if (data.success) {
        renderPurchase(data.data);
      }
    });
});
