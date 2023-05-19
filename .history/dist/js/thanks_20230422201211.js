const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "http://localhost:5000/api/";
const data = JSON.parse(localStorage.getItem("Purchase"));
// localStorage.removeItem("Purchase");
console.log("data:", data);
const User = JSON.parse(localStorage.getItem("loginUser"));
if (!User) {
  window.location.replace("./index.html");
}
if (data) {
  updateEmptyCart();
  // bill(data);
  updateStatistical(data);
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
  const addPurchase = await fetch(`${http}purchase`, {
    method: "PUT", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      authentication: User.token,
    },
    body: JSON.stringify({ purchase: data }),
  }).then((data) => data.json());

  return addPurchase;
}
const getSatatistical = async () => {
  return await fetch(`${http}statistic`).then((data) => data.json());
};
async function updateStatistical(res) {
  // .then((data) => {
  //   if (data.success) {
  //     const order = data.data[0].order + res.carts.length;
  //     const revenue = data.data[0].revenue + res.total;
  //     fetch(`${http}statistic`, {
  //       method: "PUT", // or 'PUT'
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ order, revenue }),
  //     })
  //   }
  // });

  getSatatistical().then((data) => {
    console.log(data);
  });
}

// if (data?.length > 0) {
//   let total = 0;
//   $(".cart-items").innerHTML = "";

//   const carts = data.map((val) => {
//     total += val.total;
//     return `
//               <div class="items">
//                   <span class="name-items">${val.name} - <span>${val.category}</span> - <strong>x${val.quantity}</strong></span>
//                   <span class="price-items">$${val.total}</span>
//               </div>
//       `;
//   });
//   $(".cart-items").innerHTML = carts.join("");
//   $(".total-price").innerHTML = `$${total}`;
// }

$("#btn-gohome").onclick = (e) => {
  e.preventDefault();
  $("#btn-gohome").classList.add("active");
  setTimeout(() => {
    window.location.replace("./index.html");
  }, 300);
};
