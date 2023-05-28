const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "http://localhost:5000/api/";
const data = JSON.parse(localStorage.getItem("Purchase"));
const solds = JSON.parse(localStorage.getItem("checkout"));
localStorage.removeItem("Purchase");
localStorage.removeItem("checkout");
const User = JSON.parse(localStorage.getItem("loginUser"));
if (!User) {
  window.location.replace("./index.html");
}

if (data && solds) {
  console.log("data:", data);
  updateSold(solds);
  updateEmptyCart();
  bill(data);
  updateStatistical(data);
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
  // data.map(async (val) => {
  //   console.log("val:", val);
  //   // await await fetch(`${http}updatecart/user/${User.data?.idUser}`, {
  //   //   headers: {
  //   //     "Content-type": "application/json; charset=UTF-8",
  //   //   },
  //   //   method: "PUT",
  //   //   body: JSON.stringify({ carts: [] }),
  //   // });
  // });
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
