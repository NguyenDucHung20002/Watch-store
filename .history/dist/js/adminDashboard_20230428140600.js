import { alertFullfill, alertFail } from "./alert.js";
import spinner from "./spinner.js";
spinner();

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const User = JSON.parse(localStorage.getItem("loginUser"));
const http = "http://localhost:5000/api/";

const websiteTraffic = $(".website-straffic");
const menbers = $(".user-member");
const orders = $(".order");
const revenue = $(".revenue");

let page = 1;

function formatCurrency(price) {
  var DecimalSeparator = Number("1.2").toLocaleString().substr(1, 1);
  var priceWithCommas = price.toLocaleString();
  var arParts = String(priceWithCommas).split(DecimalSeparator);
  var intPart = arParts[0];
  var decPart = arParts.length > 1 ? arParts[1] : "";
  decPart = (decPart + "000").substr(0, 3);
  return intPart;
}
console.log(formatCurrency(10000));
async function fetchData(page, limit) {
  try {
    const url = `${http}bestselling?page=${page}&limit=${limit}`;
    const response = await fetch(url, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authentication: User?.token,
      },
    });
    const products = await response.json().finally(spinner(false));
    if (products?.data?.length > 0) {
      products.data.forEach((val) => renderProducts(val));
    }
  } catch (error) {
    alertFail(error);
  }
}

function renderProducts(val) {
  const item = `
              <tr class="product-item">
                <th>
                  <a href="/detail.html?idpd=${val._id}" class="img" target="_blank">
                    <img src="${val.img}" alt="">
                  </a>

                </th>
                <th>
                  <div class="name-product">
                    ${val.name}
                  </div>
                </th>
                <th>
                  $${val.price}
                </th>
                <th>
                  ${val.state}
                </th>
                <th>${val.rating}</th>
                <th>${val.sold}</th>

              </tr>
  `;

  $(".selling-items").insertAdjacentHTML("beforeend", item);
}

async function statistical() {
  await fetch(`${http}statistic`, {
    headers: {
      "Content-Type": "application/json",
      authentication: User?.token,
    },
  })
    .then((data) => data.json())
    .then((data) => {
      if (data.success && data.data) {
        const statistic = data.data;
        websiteTraffic.innerHTML = `${formatCurrency(
          statistic.websiteTraffic
        )}`;
        menbers.innerHTML = `${formatCurrency(statistic.users)}`;
        orders.innerHTML = `${formatCurrency(statistic.order)}`;
        revenue.innerHTML = `$${formatCurrency(statistic.revenue)}`;
      }
    });
}

async function myChart() {
  const ctx = document.getElementById("myChart");
  const response = await fetch(`${http}revenues`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authentication: User?.token,
    },
  });
  const getStatistics = await response.json();
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Earning",
          data: getStatistics.data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

export default async function adminDashboard() {
  await statistical();
  await myChart();
  await fetchData(page++, 4);
  const loadMore = $(".btn-loadMore");

  loadMore.addEventListener("click", async function () {
    await fetchData(page++, 4);
  });
}
