import spinner from "./spinner.js";
import { alertFullfill, alertFail } from "./alert.js";
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
const wrapperRenderOrder = $(".render-orders");
function renderOrder(data) {
  console.log("data:", data);
  if (data && data.length > 0) {
    data.forEach((val) => {
      const div = document.createElement("strong");
      div.classList.add("checkout-item");
      const status = val.status || 0;
      const actionStatus = !status
        ? `<div class="action-deliverable">
            <button data-id="${val?._id}" class="btn-delete">Delete</button>
            <button class="btn-deliverable" data-id="${val?._id}">Delivery</button>
          </div>`
        : status == 1
        ? `<div class="action-deliverable">
            <button data-id="${val?._id}" class="btn-cancel">Cancel</button>
            <button data-id="${val?._id}" class="btn-delivered">Delivered</button>
          </div>`
        : `<div class="action-deliverable">
            <button data-id="${val?._id}" class="btn-delete">Delete</button>
            
          </div>`;
      div.innerHTML = `
      <div class="checkout-item ">

            <div class="order-header">
                <div class="date-create">${val?.datetime}</div>
                ${actionStatus}
            </div>
            <div class="checkout-detail row">
                <div class="products id-${val?._id} col-12 col-md-7">

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

      wrapperRenderOrder.insertAdjacentElement("beforeend", div);
      renderProduct(val.products, val?._id);
    });
  }
}

async function deleteOrder(orderId, page, status) {
  try {
    await fetch(`${http}order/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authentication: User?.token,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.success) {
          alertFullfill(data.message);
          wrapperRenderOrder.innerHTML = "";
        } else {
          alertFail(data.message);
        }
      })
      .finally(() => {
        spinner(false);
      });
  } catch (error) {
    console.log("error:", error);
  }
}

async function fetchOrder(page, orderid, dateTime, status) {
  // const stringDate = JSON.stringify(dateTime);
  // console.log("stringDate:", stringDate);
  try {
    await fetch(`${http}searchorder?page=${page}&dateTime=${dateTime}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authentication: User?.token,
        code: orderid,
        status,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("data:", data);
        if (data.success && !data.data.length) {
          renderOrder(data.data);
        } else {
          alertFail(data.message);
        }
      })
      .finally(() => {
        spinner(false);
      });
  } catch (error) {
    console.log("error:", error);
  }
}

async function changeStatus(id, status) {
  try {
    await fetch(`${http}order/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authentication: User?.token,
        status,
      },
      body: JSON.stringify({ status }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.success) {
          wrapperRenderOrder.innerHTML = "";
          alertFullfill(data.message);
        } else {
          alertFail(data.message);
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
  let page = 0;
  let status = 0;

  fetchOrder(++page, orderid, date, status);

  const loadMore = $(".btn-order-load-more");
  const searchOrder = $(".search-orders");
  const searchdate = $(".search-date");
  const renderOrderElement = $(".render-orders");
  renderOrderElement.addEventListener("click", async function (e) {
    const btnDeleteOrder = e.target.closest(".btn-delete");
    const btnDeliverable = e.target.closest(".btn-deliverable");

    if (btnDeliverable) {
      const deliverableOrderId = btnDeliverable.dataset.id;
      await changeStatus(deliverableOrderId, 1);
      await fetchOrder(page, orderid, date, status);
    }
    if (btnDeleteOrder) {
      const deleteOrderId = btnDeleteOrder.dataset.id;
      await deleteOrder(deleteOrderId, page, status);
      await fetchOrder(page, orderid, date, status);
    }
  });

  searchOrder.addEventListener("submit", function (e) {
    e.preventDefault();
    const getSearch = this.elements["search"].value;
    if (getSearch) {
      page = 0;
      orderid = getSearch;

      $(".wrapper-order").innerHTML = "";
      fetchOrder(++page, orderid, date, status);
    } else {
      page = 1;
      orderid = "";
      $(".wrapper-order").innerHTML = "";

      fetchOrder(++page, orderid, date, status);
    }
  });

  searchdate.addEventListener("submit", function (e) {
    e.preventDefault();
    const dateTime = new Date(this.elements["date"].value);
    if (dateTime) {
      this.reset();
      const formatTime = dateTime.toLocaleDateString("vi-VN");
      date = formatTime;
      page = 0;
      $(".wrapper-order").innerHTML = "";
      fetchOrder(++page, orderid, date, status);
    }
  });
  loadMore.addEventListener("click", function () {
    fetchOrder(++page, orderid, date, status);
  });
  const btnTabs = document.querySelectorAll(".btn-tab");
  btnTabs.forEach((val) =>
    val.addEventListener("click", function (e) {
      btnTabs.forEach((val) => val.classList.remove("active"));
      this.classList.add("active");
      page = 0;
      date = "";
      orderid = "";
      status = +e.target.dataset.id;
      $(".render-orders").innerHTML = "";
      fetchOrder(++page, orderid, date, status);
    })
  );
}
