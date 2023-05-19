import spinner from "./spinner.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "http://localhost:5000/api/";
const User = JSON.parse(localStorage.getItem("loginUser"));
if (!User) {
  window.location.replace("./index.html");
}

function renderOrder(data) {
  if (data && data.length > 0) {
    data.forEach((val) => {
      const div = document.createElement("strong");
      div.classList.add("checkout-item");
      div.innerHTML = `
                    <tr class="product-item">
                      <th>
                        123
                      </th>
                      <th>
                        hung
                      </th>
                      <th>
                        %%&*$$
                      </th>
                      <th>21/13/1111</th>
                    </tr>
      `;
      $(".users").insertAdjacentElement("beforeend", div);
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
