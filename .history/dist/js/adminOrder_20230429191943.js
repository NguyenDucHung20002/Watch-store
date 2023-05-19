import spinner from "./spinner.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "http://localhost:5000/api/";
const User = JSON.parse(localStorage.getItem("loginUser"));
if (!User) {
  window.location.replace("./index.html");
}

function renderProduct(data, index) {
  const carts = data.map((val) => {
    return `
    <div class="item">
      <a href="./detail.html?idpd=${val.ProductId}">
        <img src="${val.imgBg}"
            alt="">
      </a>
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

function renderOrder(data) {
  if (data && data.length > 0) {
    data.forEach((val, index) => {
      console.log(val.products);
      const div = document.createElement("strong");
      div.classList.add("checkout-item");
      div.innerHTML = `
      <div class="checkout-item ">
            <div class="date-create">
                ${val?.datetime}
            </div>
            <div class="checkout-detail row">
                <div class="products id-${val?.orderId} col-12 col-md-7">
                    
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
      $(".wrapper-order").insertAdjacentElement("beforeend", div);
      renderProduct(val.products, val?.orderId);
    });
  } else {
    $(".wrapper-checkout").innerHTML = `
    <div class="wrapper-bill-empty">
        <img class="bill-empty" src="./img/empty-cart.png" alt="">
        <h2>Your bill is empty</h2>
    </div>`;
  }
}

let page = 1;

async function fetchOrder(page) {
  try {
    await fetch(`${http}recentorders?page=${page}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authentication: User?.token,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("data:", data);
        if (data.success) {
          renderOrder(data.data);
        }
      })
      .finally(() => {
        spinner(false);
      });
  } catch (error) {
    console.log("error:", error);
  }
}

export default function adminOrder() {
  fetchOrder(page++);

  const loadMore = $(".btn-order-load-more");

  loadMore.addEventListener("click", function () {
    fetchOrder(page++);
  });
}
