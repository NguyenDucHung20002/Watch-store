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
            <p class="product-id">${val.ProductId}</p>
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

function renderOrder(data, satatus = 0) {
  if (data && data.length > 0) {
    data.forEach((val) => {
      const div = document.createElement("strong");
      div.classList.add("checkout-item");
      div.innerHTML = `
      <div class="checkout-item ">

            <div class="order-header">
                <div class="date-create">${val?.datetime}</div>
                <div class="action-deliverable">
                  <button class="btn-deliverable">Deliverable</button>
                </div>
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
                            <div class="live order-id">${val?.orderId}</div>
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
      const checkStatus = !satatus
        ? ".order-new"
        : satatus === 1
        ? ".order-pending"
        : ".order-successfully";
      $(checkStatus).insertAdjacentElement("beforeend", div);
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

async function fetchOrder(page, orderid, dateTime) {
  // const stringDate = JSON.stringify(dateTime);
  // console.log("stringDate:", stringDate);
  try {
    await fetch(`${http}searchorder?page=${page}&dateTime=${dateTime}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authentication: User?.token,
        code: orderid,
      },
    })
      .then((data) => data.json())
      .then((data) => {
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
  let orderid = "";
  let date = "";
  let page = 1;
  fetchOrder(page++, orderid, date);

  const loadMore = $(".btn-order-load-more");
  const searchOrder = $(".search-orders");
  const searchdate = $(".search-date");

  searchOrder.addEventListener("submit", function (e) {
    e.preventDefault();
    const getSearch = this.elements["search"].value;
    if (getSearch) {
      page = 1;
      orderid = getSearch;

      $(".wrapper-order").innerHTML = "";
      fetchOrder(page++, orderid, date);
    } else {
      page = 1;
      orderid = "";
      $(".wrapper-order").innerHTML = "";

      fetchOrder(page++, orderid, date);
    }
  });

  searchdate.addEventListener("submit", function (e) {
    e.preventDefault();
    const dateTime = new Date(this.elements["date"].value);
    if (dateTime) {
      this.reset();
      const formatTime = dateTime.toLocaleDateString("vi-VN");
      date = formatTime;
      page = 1;
      $(".wrapper-order").innerHTML = "";
      fetchOrder(page++, orderid, date);
    }
  });
  loadMore.addEventListener("click", function () {
    fetchOrder(page++, orderid, date);
  });
}
