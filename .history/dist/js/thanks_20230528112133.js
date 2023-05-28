const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "http://localhost:5000/api/";
const data = JSON.parse(localStorage.getItem("Purchase"));
const solds = JSON.parse(localStorage.getItem("checkout"));
// localStorage.removeItem("Purchase");
// localStorage.removeItem("checkout");
const User = JSON.parse(localStorage.getItem("loginUser"));
if (!User) {
  window.location.replace("./index.html");
}

function getSearchParameters() {
  var prmstr = window.location.search.substring(1);
  return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}
function transformToAssocArray(prmstr) {
  var params = {};
  var prmarr = prmstr.split("&");
  for (var i = 0; i < prmarr.length; i++) {
    var tmparr = prmarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
  }
  return params;
}
const messageUrl = getSearchParameters().message
  ? getSearchParameters().message.split("+").join("")
  : "";
const decodeMessage = decodeURIComponent(messageUrl);
if (decodeMessage.includes("Giaodịchbịtừchốibởingườidùng")) {
  return false;
}

if (data && solds) {
  console.log("data:", data);
  // updateSold(solds);
  // updateEmptyCart();
  // bill(data);
  // updateStatistical(data);
}

async function updateSold(data) {
  const sold = data.map((val) => {
    return {
      id: val._id,
      quantity: val.quantity,
    };
  });
  await fetch(`${http}sold`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authentication: User?.token,
    },
    method: "PUT",
    body: JSON.stringify({ sold }),
  });
}

async function updateEmptyCart() {
  await fetch(`${http}updatecart/user/${User.data?.idUser}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authentication: User?.token,
    },
    method: "PUT",
    body: JSON.stringify({ carts: [] }),
  });
}

async function bill(data) {
  const addPurchase = await fetch(`${http}order`, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      authentication: User.token,
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());

  return addPurchase;
}

async function updateStatistical(res) {
  const order = res.products.length;
  const revenue = res.total;
  fetch(`${http}statistic`, {
    method: "post", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      authentication: User.token,
    },
    body: JSON.stringify({ order, revenue }),
  });
}

if (data) {
  let total = 0;
  $(".cart-items").innerHTML = "";

  const carts = data.products.map((val) => {
    total += val.total;
    return `
              <div class="items">
                  <span class="name-items">${val.name} - <span>${val.category}</span> - <strong>x${val.quantity}</strong></span>
                  <span class="price-items">$${val.total}</span>
              </div>
      `;
  });
  $(".cart-items").innerHTML = carts.join("");
  $(".total-price").innerHTML = `$${total}`;
}

$("#btn-gohome").onclick = (e) => {
  e.preventDefault();
  $("#btn-gohome").classList.add("active");
  setTimeout(() => {
    window.location.replace("./index.html");
  }, 300);
};
